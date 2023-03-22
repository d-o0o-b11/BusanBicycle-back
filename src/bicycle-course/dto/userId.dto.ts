import { IsNumber, IsOptional } from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @IsNumber()
  @IsOptional()
  course_id?: number;
}
