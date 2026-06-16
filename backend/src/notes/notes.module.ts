import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesRepository } from './notes.repository';
import { NotesMapper } from './notes.mapper';
import { RepetitionModule } from '../repetition/repetition.module';

@Module({
  imports: [RepetitionModule],
  providers: [NotesService, NotesRepository, NotesMapper],
  controllers: [NotesController],
})
export class NotesModule {}
