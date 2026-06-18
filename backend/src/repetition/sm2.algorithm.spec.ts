import { calculateNextReview } from './sm2.algorithm';

describe('SM-2', () => {
  const initial = { easeFactor: 2.5, interval: 1, repetitions: 0 };

  it('should reset card when grade is 0', () => {
    const result = calculateNextReview(
      { easeFactor: 2.5, interval: 15, repetitions: 3 },
      0,
    );
    expect(result.repetitions).toBe(0);
    expect(result.interval).toBe(1);
  });

  it('should set interval to 1 on first successful review', () => {
    const result = calculateNextReview(initial, 2);
    expect(result.interval).toBe(1);
    expect(result.repetitions).toBe(1);
  });

  it('should set interval to 6 on second successful review', () => {
    const first = calculateNextReview(initial, 2);
    const result = calculateNextReview(first, 2);
    expect(result.interval).toBe(6);
  });

  it('should not let easeFactor drop below 1.3', () => {
    let card = initial;
    for (let i = 0; i < 10; i++) {
      card = calculateNextReview(card, 1);
    }
    expect(card.easeFactor).toBe(1.3);
  });

  it('should increase interval on easy grage', () => {
    const card = { easeFactor: 2.5, interval: 6, repetitions: 2 };
    const result = calculateNextReview(card, 3);
    expect(result.interval).toBeGreaterThan(6);
  });
});
