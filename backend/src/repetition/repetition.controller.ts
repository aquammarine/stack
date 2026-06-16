import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RepetitionService } from './repetition.service';
import { CurrentUser } from '../common/decorators/curent-user.decorator';
import type { JwtPayload } from '../common/types/user.types';
import { ReviewGrade } from '../generated/client';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('repetition')
@UseGuards(JwtAuthGuard)
export class RepetitionController {
  constructor(private readonly repetitionService: RepetitionService) {}

  @Post(':noteId')
  create(@CurrentUser() user: JwtPayload, @Body('noteId') noteId: string) {
    return this.repetitionService.create(noteId, user.id);
  }

  @Post('review/:cardId')
  update(
    @CurrentUser() user: JwtPayload,
    @Param('cardId') cardId: string,
    @Body('grade') grade: ReviewGrade,
  ) {
    return this.repetitionService.update(grade, user.id, cardId);
  }

  @Get('today')
  getDailyQueue(@CurrentUser() user: JwtPayload) {
    return this.repetitionService.getDailyQueue(user.id);
  }
}
