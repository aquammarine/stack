import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/curent-user.decorator';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';
import type { JwtPayload } from '../common/types/user.types';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateNoteDto) {
    return this.notesService.create(user.id, dto);
  }

  @Get(':id')
  findById(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.notesService.findById(id, user.id);
  }

  @Get()
  findByUser(@CurrentUser() user: JwtPayload) {
    return this.notesService.findByUser(user.id);
  }

  @Put(':id')
  update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, user.id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.notesService.remove(id, user.id);
  }
}
