import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMail(toEmail: string) {
    const randomNum: number = Math.floor(Math.random() * 900000) + 100000;

    try {
      this.mailerService.sendMail({
        to: toEmail,
        from: 'jimin8830@naver.com',
        subject: '🎉 [부산 자전거 도로] 가입을 환영합니다! 🎉', // Subject line
        text: 'welcome nodemailer ', // plaintext body
        html: `<b>회원 가입을 환영합니다.</b> <div>인증 번호: ${randomNum}</div>`, // HTML body content
      });

      return randomNum;
    } catch (e) {
      throw new Error('이메일 전송 실패');
    }
  }
}
