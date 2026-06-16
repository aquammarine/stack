import { IsEnum } from 'class-validator';
import { ReviewGrade } from '../repetition.types';

export class ReviewDto {
  @IsEnum(ReviewGrade)
  grade!: ReviewGrade;
}
