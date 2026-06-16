import { BadRequestException } from '@nestjs/common';
import { Prisma } from '../generated/client';
import { NotesMapper } from '../notes/notes.mapper';
import { ReviewGrade } from './repetition.types';

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
      repetition: card.repetition,
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
    const map: Record<string, ReviewGrade> = {
      AGAIN: ReviewGrade.AGAIN,
      HARD: ReviewGrade.HARD,
      GOOD: ReviewGrade.GOOD,
      EASY: ReviewGrade.EASY,
    };

    const result = map[grade];

    if (!result)
      throw new BadRequestException(`Invalid review grade: ${grade}`);

    return result;
  }

  static toPrisma(grade: ReviewGrade): string {
    const map: Record<ReviewGrade, string> = {
      [ReviewGrade.AGAIN]: 'AGAIN',
      [ReviewGrade.HARD]: 'HARD',
      [ReviewGrade.GOOD]: 'GOOD',
      [ReviewGrade.EASY]: 'EASY',
    };
    return map[grade];
  }
}
