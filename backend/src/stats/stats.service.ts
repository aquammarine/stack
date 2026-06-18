import { BadRequestException, Injectable } from '@nestjs/common';
import { StatsRepository } from './stats.repository';

@Injectable()
export class StatsService {
  constructor(private readonly statsRepository: StatsRepository) {}

  async getGlobalStats(userId: string) {
    if (!userId) throw new BadRequestException('Invalid userId');

    const [globalStats, streak] = await Promise.all([
      this.statsRepository.getGlobalStats(userId),
      this.calculateStreak(userId),
    ]);

    return { ...globalStats, streak };
  }

  private async calculateStreak(userId: string) {
    if (!userId) throw new BadRequestException('Invalid userId');

    const dates = await this.statsRepository.getReviewDates(userId);
    const reviewDates = new Set(
      dates.map((date) => date.reviewedAt.toISOString().split('T')[0]),
    );

    const day = new Date();

    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const dateSrt = day.toISOString().split('T')[0];
      if (!reviewDates.has(dateSrt)) {
        break;
      }
      streak++;
      day.setDate(day.getDate() - 1);
    }

    return streak;
  }
}
