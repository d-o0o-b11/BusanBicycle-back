import { IsNumber } from 'class-validator';

export class FinishCourseDto {
  @IsNumber()
  course_id: number;

  @IsNumber()
  user_id: number;
}
