import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { RedisModule } from '../redis/redis.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [JwtModule, UsersModule, RedisModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
