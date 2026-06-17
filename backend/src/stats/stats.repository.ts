import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getGlobalStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        _count: {
          select: {
            notes: true,
            ReviewCard: true,
          },
        },
      },
    });

    const plannedReviews = await this.prisma.reviewCard.count({
      where: { userId, nextReviewAt: { lte: new Date() } },
    });

    return {
      totalNotes: user?._count.notes ?? 0,
      totalCards: user?._count.ReviewCard ?? 0,
      plannedReviews,
    };
  }

  async getReviewDates(userId: string) {
    return this.prisma.reviewHistory.findMany({
      where: { reviewCard: { userId } },
      select: { reviewedAt: true },
      orderBy: { reviewedAt: 'desc' },
      take: 200,
    });
  }
}
