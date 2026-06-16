import { Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesMapper } from './notes.mapper';
import { RepetitionService } from '../repetition/repetition.service';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly repetitionService: RepetitionService,
  ) {}

  async create(userId: string, dto: CreateNoteDto) {
    const note = await this.notesRepository.create(userId, dto);
    await this.repetitionService.create(note.id, userId);
    return NotesMapper.toResponse(note);
  }

  async findById(id: string, userId: string) {
    const note = await this.notesRepository.findById(id, userId);
    if (!note)
      throw new NotFoundException("Note with this userId doesn't exists.");
    return NotesMapper.toResponse(note);
  }

  async findByUser(userId: string) {
    const notes = await this.notesRepository.findByUser(userId);
    return NotesMapper.toResponseList(notes);
  }

  async update(id: string, userId: string, dto: UpdateNoteDto) {
    await this.findById(id, userId);
    const updatedNote = await this.notesRepository.update(id, userId, dto);
    if (!updatedNote)
      throw new NotFoundException("Note with this userId doesn't exists.");
    return NotesMapper.toResponse(updatedNote);
  }

  async remove(id: string, userId: string) {
    await this.findById(id, userId);
    const deletedNote = await this.notesRepository.remove(id, userId);
    if (!deletedNote)
      throw new NotFoundException("Note with this userId doesn't exists.");
    return NotesMapper.toResponse(deletedNote);
  }
}
