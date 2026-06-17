import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationRepository } from './notifications.repository';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [NotificationsService, NotificationRepository],
  imports: [MailModule],
})
export class NotificationsModule {}
