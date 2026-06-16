import { Tag } from '../generated/client';

export class TagsMapper {
  static toResponse(tag: Tag) {
    return {
      id: tag.id,
      name: tag.name,
      color: tag.color,
    };
  }

  static toResponseList(tags: Tag[]) {
    return tags.map((t) => this.toResponse(t));
  }
}
