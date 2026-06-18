import { BadRequestException } from '@nestjs/common';
import { ReviewGrade as PrismaReviewGrade, Prisma } from '../generated/client';
import { ReviewGrade } from './repetition.types';
import { NotesMapper } from '../notes/notes.mapper';

const toDomainMap: Record<string, ReviewGrade> = {
  AGAIN: ReviewGrade.AGAIN,
  HARD: ReviewGrade.HARD,
  GOOD: ReviewGrade.GOOD,
  EASY: ReviewGrade.EASY,
};

const toPrismaMap: Record<ReviewGrade, PrismaReviewGrade> = {
  [ReviewGrade.AGAIN]: PrismaReviewGrade.AGAIN,
  [ReviewGrade.HARD]: PrismaReviewGrade.HARD,
  [ReviewGrade.GOOD]: PrismaReviewGrade.GOOD,
  [ReviewGrade.EASY]: PrismaReviewGrade.EASY,
};

export type ReviewCardWithNote = Prisma.ReviewCardGetPayload<{
  include: {
    note: {
      include: { tag: { include: { tag: true } } };
    };
  };
}>;

export class RepetitionMapper {
  static toResponse(card: ReviewCardWithNote) {
    return {
      id: card.id,
      easeFactor: card.easeFactor,
      interval: card.interval,
      repetitions: card.repetitions,
      nextReviewAt: card.nextReviewAt,
      note: NotesMapper.toResponse(card.note),
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
    };
  }

  static toResponseList(cards: ReviewCardWithNote[]) {
    return cards.map((card) => this.toResponse(card));
  }

  static toDomain(grade: string): ReviewGrade {
    const result = toDomainMap[grade];
    if (result === undefined) {
      throw new BadRequestException(`Invalid review grade: ${grade}`);
    }
    return result;
  }

  static toPrisma(grade: ReviewGrade): PrismaReviewGrade {
    return toPrismaMap[grade];
  }
}
