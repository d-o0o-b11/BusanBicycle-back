import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @ApiProperty({
    description: '아이디',
    example: '22',
  })
  user_id: string;

  @IsString()
  @MaxLength(30)
  @ApiProperty({
    description: '비밀번호',
    example: '22',
  })
  user_pw: string;
}
