import { IsNumber, IsOptional } from 'class-validator';

export class UserLiekDto {
  @IsNumber()
  id?: number;

  @IsNumber()
  @IsOptional()
  user_id?: number;

  @IsNumber()
  @IsOptional()
  course_id?: number;
}
