import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, MaxLength } from 'class-validator';

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

  @IsBoolean()
  @ApiProperty({
    description: '아이디 중복체크 여부',
    example: true,
  })
  check: boolean;
}
