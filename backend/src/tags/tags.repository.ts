import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/client';

@Injectable()
export class TagsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.TagCreateInput) {
    return this.prisma.tag.create({ data });
  }

  findTags(userId: string) {
    return this.prisma.tag.findMany({ where: { userId } });
  }

  async remove(id: string, userId: string) {
    const tag = await this.prisma.tag.findFirst({ where: { id, userId } });
    if (!tag) return null;
    return this.prisma.tag.delete({ where: { id, userId } });
  }
}
