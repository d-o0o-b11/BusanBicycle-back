import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CheckIdDto {
  @IsString()
  @MaxLength(30)
  @ApiProperty({
    example: '11',
    description: '아이디 중복 확인 ',
  })
  user_id: string;
}
