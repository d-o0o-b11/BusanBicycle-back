import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'user_id',
    example: 4,
  })
  user_id?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'course_id',
    example: 5,
  })
  course_id?: number;
}
