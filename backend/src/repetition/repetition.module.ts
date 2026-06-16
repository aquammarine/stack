import { Module } from '@nestjs/common';
import { RepetitionRepository } from './repetition.repository';
import { RepetitionService } from './repetition.service';
import { RepetitionController } from './repetition.controller';

@Module({
  providers: [RepetitionRepository, RepetitionService],
  controllers: [RepetitionController],
  exports: [RepetitionService],
})
export class RepetitionModule {}
