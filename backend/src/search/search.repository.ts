import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Note } from '../generated/client';

@Injectable()
export class SearchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async searchNotes(userId: string, query: string): Promise<Note[]> {
    return this.prisma.$queryRaw`
            SELECT n.* FROM notes n
            WHERE n."userId" = ${userId}
            AND (
                to_tsvector('english', n.title ||  ' ' || n.content) @@ websearch_to_tsquery('english', ${query})
                OR n.title ILIKE ${'%' + query + '%'}
                OR n.content ILIKE ${'%' + query + '%'}
            )
            ORDER BY ts_rank(to_tsvector('english', n.title || ' ' || n.content), websearch_to_tsquery('english', ${query})) DESC
            LIMIT 20;
        `;
  }
}
