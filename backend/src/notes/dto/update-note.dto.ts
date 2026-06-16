import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { NoteType } from '../../generated/enums';

export class UpdateNoteDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @IsEnum(NoteType)
  @IsOptional()
  noteType?: NoteType;

  @IsString()
  @IsOptional()
  content?: string;

  @IsUrl()
  @IsOptional()
  sourceUrl?: string;
}
