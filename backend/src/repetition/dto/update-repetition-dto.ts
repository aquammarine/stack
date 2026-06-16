import { IsDate, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateRepetitionDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsNumber()
  easeFactor?: number;

  @IsNumber()
  interval?: number;

  @IsNumber()
  repetition?: number;

  @IsDate()
  nextReviewAt?: Date;
}
