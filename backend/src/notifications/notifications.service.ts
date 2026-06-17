import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationRepository } from './notifications.repository';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly mailService: MailService,
  ) {}

  @Cron('* * * * *')
  async handleDailyReminders() {
    const users = await this.notificationRepository.getUserWithPendingReview();

    if (users.length === 0) {
      console.log('[Cron] No reminders for today');
    }

    users.forEach((user) => {
      const count = user._count.ReviewCard;
      this.mailService.sendDailyReminder(user.email, user.name, count);
    });
  }
}
