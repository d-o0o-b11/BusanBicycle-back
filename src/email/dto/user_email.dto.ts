import { ApiProperty } from '@nestjs/swagger';

export class UserEmailDto {
  @ApiProperty({
    description: '인증 이메일',
    example: 'jimin8830@naver.com',
  })
  email: string;
}
