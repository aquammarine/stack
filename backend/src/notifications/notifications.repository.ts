import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserWithPendingReview() {
    const today = new Date();
    return this.prisma.user.findMany({
      where: {
        ReviewCard: {
          some: {
            nextReviewAt: {
              lte: today,
            },
          },
        },
      },
      select: {
        name: true,
        email: true,
        _count: {
          select: {
            ReviewCard: {
              where: {
                nextReviewAt: {
                  lte: today,
                },
              },
            },
          },
        },
      },
    });
  }
}
