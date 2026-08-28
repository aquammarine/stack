import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
    private readonly userService: UsersService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash!,
    );

    if (!isPasswordValid)
      throw new BadRequestException('Invalid login or password');

    return {
      tokens: await this.generateToken(user.id, user.email, user.name),
      user: { id: user.id, name: user.name },
    };
  }

  async register(dto: RegisterDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user)
      throw new ConflictException('User with same email is already exists');

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const { password, ...rest } = dto;
    const newUser = await this.userService.create({ ...rest, passwordHash });

    return {
      tokens: await this.generateToken(newUser.id, newUser.email, newUser.name),
      user: { id: newUser.id, name: newUser.name },
    };
  }

  async logout(refreshToken: string) {
    return await this.redis.del(`refresh:${refreshToken}`);
  }

  async generateToken(userId: string, email: string, name: string) {
    const payload = { sub: userId, email, name };

    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = crypto.randomUUID();

    await this.redis.set(
      `refresh:${refreshToken}`,
      userId,
      'EX',
      30 * 24 * 60 * 60,
    );

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const userId = await this.redis.get(`refresh:${refreshToken}`);

    if (!userId) throw new UnauthorizedException('Expired or invalid token');

    await this.redis.del(`refresh:${refreshToken}`);

    const user = await this.userService.findById(userId);

    if (!user) throw new UnauthorizedException();

    return this.generateToken(user.id, user.email, user.name);
  }
}
