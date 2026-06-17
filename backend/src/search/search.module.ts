import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SearchRepository } from './search.repository';

@Module({
  providers: [SearchService, SearchRepository],
  controllers: [SearchController],
})
export class SearchModule {}
