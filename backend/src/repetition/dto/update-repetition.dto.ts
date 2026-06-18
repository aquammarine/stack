import { IsDate, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdatesDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsNumber()
  easeFactor?: number;

  @IsNumber()
  interval?: number;

  @IsNumber()
  repetitions?: number;

  @IsDate()
  nextReviewAt?: Date;
}
