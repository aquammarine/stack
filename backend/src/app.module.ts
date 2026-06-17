import { Module } from '@nestjs/common';
import { schema } from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RedisModule } from './redis/redis.module';
import { NotesModule } from './notes/notes.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagsModule } from './tags/tags.module';
import { RepetitionModule } from './repetition/repetition.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from './notifications/notifications.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: schema,
    }),
    ScheduleModule.forRoot(),
    NotesModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    RedisModule,
    TagsModule,
    RepetitionModule,
    NotificationsModule,
    MailModule,
  ],
})
export class AppModule {}
