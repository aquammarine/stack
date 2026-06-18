import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/curent-user.decorator';
import type { JwtPayload } from '../common/types/user.types';
import { StatsService } from './stats.service';

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  getGlobalStats(@CurrentUser() user: JwtPayload) {
    return this.statsService.getGlobalStats(user.id);
  }
}
