import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { NoteType } from '../../generated/enums';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @IsEnum(NoteType)
  @IsOptional()
  noteType?: NoteType;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsUrl()
  @IsOptional()
  sourceUrl?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  tagIds?: string[];
}
