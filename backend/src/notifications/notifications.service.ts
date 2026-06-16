import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class NotificationsService {
  @Cron('0 9 * * *')
  async handleDailyReminders() {
    console.log('cron');
  }
}
