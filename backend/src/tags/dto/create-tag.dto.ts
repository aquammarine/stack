import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Color } from '../../generated/enums';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(Color)
  @IsOptional()
  color?: Color;
}
