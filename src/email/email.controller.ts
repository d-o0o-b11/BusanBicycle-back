import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEmailDto } from './dto/user_email.dto';

@ApiTags('이메일 전송 api')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOperation({
    summary: '이메일 인증번호 전송 요청',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '존재하는 이메일입니다.',
  })
  @Post()
  async sendMailToUser(@Body() data: UserEmailDto) {
    try {
      return await this.emailService.sendMail(data.email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('test')
  async sendBestCourse() {
    try {
      return await this.emailService.sendBestCourse();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
