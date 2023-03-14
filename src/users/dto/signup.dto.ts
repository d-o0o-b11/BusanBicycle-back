import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MaxLength(30)
  @ApiProperty({
    description: '아이디',
    example: 'jimin8830',
  })
  member_id: string;

  @IsString()
  @MaxLength(30)
  @ApiProperty({
    description: '비밀번호',
    example: 'wlals12',
  })
  member_pw: string;
}
