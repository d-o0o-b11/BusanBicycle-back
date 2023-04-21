import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FinishCourseDto {
  @IsNumber()
  @ApiProperty({
    description: 'course_id',
    example: 5,
  })
  course_id: number;

  @IsNumber()
  @ApiProperty({
    description: 'user_id',
    example: 5,
  })
  user_id: number;
}
