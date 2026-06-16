import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RepetitionRepository } from './repetition.repository';
import { calculateNextReview } from './sm2.algorithm';
import { ReviewGrade } from './repetition.types';
import { RepetitionMapper } from './repetition.mapper';

@Injectable()
export class RepetitionService {
  constructor(private readonly repetitionRepository: RepetitionRepository) {}

  create(noteId: string, userId: string) {
    if (!noteId || !userId) {
      throw new BadRequestException('noteId or userId is missing');
    }
    return this.repetitionRepository.create(noteId, userId);
  }

  findByNoteId(noteId: string, userId: string) {
    if (!noteId || !userId) {
      throw new BadRequestException('noteId or userId is missing');
    }
    return this.repetitionRepository.findByNoteId(noteId, userId);
  }

  async update(grade: ReviewGrade, userId: string, cardId: string) {
    if (!cardId || !userId) {
      throw new BadRequestException('cardId or userId is missing');
    }

    const cardState = await this.repetitionRepository.findById(cardId, userId);

    if (!cardState) {
      throw new NotFoundException('Card state is missing');
    }

    const newCardState = calculateNextReview(
      {
        easeFactor: cardState.easeFactor ?? 2.5,
        interval: cardState.interval ?? 0,
        repetition: cardState.repetition ?? 0,
      },
      grade,
    );

    const updateState = {
      id: cardId,
      ...newCardState,
    };

    const prismaGrade = RepetitionMapper.toPrisma(grade);

    return this.repetitionRepository.update(userId, prismaGrade, updateState);
  }

  async getDailyQueue(userId: string) {
    if (!userId) {
      throw new BadRequestException('userId is missing');
    }
    const dailyQueue = await this.repetitionRepository.getDailyQueue(userId);
    return RepetitionMapper.toResponseList(dailyQueue);
  }
}
