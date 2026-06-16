import { IsEnum } from 'class-validator';
import { ReviewGrade } from '../../generated/enums';

export class ReviewDto {
  @IsEnum(ReviewGrade)
  grade!: ReviewGrade;
}
