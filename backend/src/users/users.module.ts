import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './user.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
