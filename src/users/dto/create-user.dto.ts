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

  @IsString()
  @ApiProperty({
    description: '이메일',
    example: 'ddd@naver.com',
  })
  email: string;

  @IsBoolean()
  @ApiProperty({
    description: '아이디 중복체크 여부',
    example: true,
  })
  check: boolean;

  @IsBoolean()
  @ApiProperty({
    description: '이메일 인증번호 성공 여부',
    example: true,
  })
  email_check: boolean;
}
