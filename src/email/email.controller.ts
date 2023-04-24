import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEmailDto } from './dto/user_email.dto';

@ApiTags('이메일 전송 api')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOperation({
    summary: '이메일 인증번호 전송 요청',
  })
  @Post()
  async sendMailToUser(@Body() data: UserEmailDto) {
    try {
      return await this.emailService.sendMail(data.email);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
