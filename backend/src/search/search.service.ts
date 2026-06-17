import { Injectable } from '@nestjs/common';
import { SearchRepository } from './search.repository';

@Injectable()
export class SearchService {
  constructor(private readonly searchRepository: SearchRepository) {}

  searchNotes(userId: string, query: string) {
    if (!query || query.trim().length < 2) return [];
    return this.searchRepository.searchNotes(userId, query);
  }
}
