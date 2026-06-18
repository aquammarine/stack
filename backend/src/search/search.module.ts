import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SearchRepository } from './search.repository';
import { SearchMapper } from './search.mapper';

@Module({
  providers: [SearchService, SearchRepository, SearchMapper],
  controllers: [SearchController],
})
export class SearchModule {}
