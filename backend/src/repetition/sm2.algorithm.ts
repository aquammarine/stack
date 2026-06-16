export type ReviewGrade = 0 | 1 | 2 | 3;

interface CardState {
  easeFactor: number;
  interval: number;
  repetition: number;
}

export function calculateNextReview(card: CardState, grade: ReviewGrade) {
  let { easeFactor, repetition, interval } = card;
  if (grade === 0) {
    repetition = 0;
    interval = 1;
  } else {
    easeFactor += 0.1 - (3 - grade) * (0.08 + (3 - grade) * 0.02);
    easeFactor = Math.max(1.3, easeFactor);

    if (repetition === 0) interval = 1;
    else if (repetition === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);

    repetition += 1;
  }

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + interval);
  nextReviewAt.setHours(0, 0, 0, 0);

  return { easeFactor, interval, repetition, nextReviewAt };
}
