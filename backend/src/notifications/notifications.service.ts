import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  @Cron('* * * * *')
  async handleDailyReminders() {
    const users = await this.notificationRepository.getUserWithPendingReview();

    if (users.length === 0) {
      console.log('[Cron] No reminders for today');
    }

    users.forEach((user) => {
      const count = user._count.ReviewCard;
      console.log(
        `[Notification] Hello ${user.name}! You have ${count} reminders of repetition for today.`,
      );
    });
  }
}
