import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/curent-user.decorator';
import { CreateTagDto } from './dto/create-tag.dto';
import type { JwtPayload } from '../common/types/user.types';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateTagDto) {
    return this.tagsService.create(user.id, dto);
  }

  @Get()
  findTags(@CurrentUser() user: JwtPayload) {
    return this.tagsService.findTags(user.id);
  }

  @Delete(':id')
  remove(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.tagsService.remove(id, user.id);
  }
}
