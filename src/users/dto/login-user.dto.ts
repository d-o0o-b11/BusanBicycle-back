import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    description: '유저 아이디',
    example: '22',
  })
  user_id: string;

  @IsString()
  @ApiProperty({
    description: '유저 비번',
    example: '22',
  })
  user_pw: string;
}
