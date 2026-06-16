import { Injectable, NotFoundException } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsMapper } from './tags.mapper';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async create(userId: string, dto: CreateTagDto) {
    const tag = await this.tagsRepository.create({
      ...dto,
      user: { connect: { id: userId } },
    });
    return TagsMapper.toResponse(tag);
  }

  async findTags(userId: string) {
    const tags = await this.tagsRepository.findTags(userId);
    return TagsMapper.toResponseList(tags);
  }

  async remove(id: string, userId: string) {
    const tag = await this.tagsRepository.remove(id, userId);
    if (!tag) throw new NotFoundException();
    return TagsMapper.toResponse(tag);
  }
}
