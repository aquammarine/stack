import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/curent-user.decorator';
import type { JwtPayload } from '../common/types/user.types';
import { SearchService } from './search.service';

@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@CurrentUser() user: JwtPayload, @Query('q') query: string) {
    return this.searchService.searchNotes(user.id, query);
  }
}
