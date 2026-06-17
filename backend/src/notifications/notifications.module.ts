import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationRepository } from './notifications.repository';

@Module({
  providers: [NotificationsService, NotificationRepository],
})
export class NotificationsModule {}
