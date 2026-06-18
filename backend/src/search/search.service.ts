import { Injectable } from '@nestjs/common';
import { SearchRepository } from './search.repository';
import { SearchMapper } from './search.mapper';

@Injectable()
export class SearchService {
  constructor(private readonly searchRepository: SearchRepository) {}

  async searchNotes(userId: string, query: string) {
    if (!query || query.trim().length < 2) return [];
    
    const notes = await this.searchRepository.searchNotes(userId, query);

    return SearchMapper.toResponseList(notes);
  }
}
