import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, ReviewGrade } from '../generated/client';

interface UpdateReviewCardData {
  id: string;
  easeFactor: number;
  interval: number;
  repetition: number;
  nextReviewAt: Date;
}

@Injectable()
export class RepetitionRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(noteId: string, userId: string) {
    return this.prisma.reviewCard.create({
      data: {
        noteId,
        userId,
      },
    });
  }

  findByNoteId(noteId: string, userId: string) {
    return this.prisma.reviewCard.findFirst({
      where: {
        noteId,
        userId,
      },
    });
  }

  findById(id: string, userId: string) {
    return this.prisma.reviewCard.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(userId: string, grade: ReviewGrade, data: UpdateReviewCardData) {
    const { id, ...updateData } = data;
    try {
      return await this.prisma.reviewCard.update({
        where: { id, userId },
        data: {
          ...updateData,
          reviewHistory: {
            create: {
              grade,
              easeFactor: updateData.easeFactor,
              interval: updateData.interval,
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error;
    }
  }

  async getDailyQueue(userId: string) {
    const today = new Date();

    return this.prisma.reviewCard.findMany({
      where: {
        userId,
        nextReviewAt: {
          lte: today,
        },
      },
      include: {
        note: {
          include: { tag: { include: { tag: true } } },
        },
      },
    });
  }
}
