import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
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

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  tagIds?: string[];
}
