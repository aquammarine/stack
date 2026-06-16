import { Test, TestingModule } from '@nestjs/testing';
import { RepetitionService } from './repetition.service';
import { RepetitionRepository } from './repetition.repository';
import { ReviewGrade } from '../generated/client';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

describe('RepetitionService', () => {
  let service: RepetitionService;
  let repository: RepetitionRepository;

  const mockRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepetitionService,
        { provide: RepetitionRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<RepetitionService>(RepetitionService);
    repository = module.get<RepetitionRepository>(RepetitionRepository);
  });

  it('should throw NotFoundException if card is not found', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(
      service.update(ReviewGrade.GOOD, 'user-1', 'card-1'),
    ).rejects.toThrow(NotFoundException);
  });

  it('should update the card state correctly', async () => {
    const cardState = {
      id: 'card-1',
      easeFactor: 2.5,
      interval: 0,
      repetition: 0,
    };

    const updatedCardState = {
      ...cardState,
      interval: 1,
      repetition: 1,
      nextReviewAt: new Date(),
    };

    mockRepository.findById.mockResolvedValue(cardState);
    mockRepository.update.mockResolvedValue(updatedCardState);

    await expect(
      service.update(ReviewGrade.GOOD, 'user-1', 'card-1'),
    ).resolves.toBeDefined();
    expect(repository.update).toHaveBeenCalledWith(
      'user-1',
      expect.objectContaining({
        ...updatedCardState,
        nextReviewAt: expect.any(Date),
      }),
    );
  });
});
