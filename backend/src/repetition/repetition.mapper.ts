import { Prisma, ReviewGrade } from '../generated/client';
import { NotesMapper } from '../notes/notes.mapper';

export const grades = {
  [ReviewGrade.AGAIN]: 0,
  [ReviewGrade.HARD]: 1,
  [ReviewGrade.GOOD]: 2,
  [ReviewGrade.EASY]: 3,
} as const;

export type ReviewCardWithNote = Prisma.ReviewCardGetPayload<{
  include: {
    note: {
      include: { tag: { include: { tag: true } } };
    };
  };
}>;

export class ReviewCardMapper {
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
}
