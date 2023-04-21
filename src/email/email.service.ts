import { Injectable } from '@nestjs/common';
import Mail = require('nodemailer/lib/mailer');
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMail(toEmail: string) {
    const randomNum: number = Math.floor(Math.random() * 900000) + 100000;

    this.mailerService
      .sendMail({
        to: 'jimin8830@naver.com',
        from: 'jimin8830@naver.com',
        subject: '가입을 환영합니다 🏃💨 ✔', // Subject line
        text: 'welcome nodemailer ', // plaintext body
        html: `<b>회원 가입을 환영합니다.</b> <div>인증 번호: ${randomNum}</div>`, // HTML body content
      })
      .then(() => {
        return randomNum;
      })
      .catch((error) => {
        throw new Error('이메일 전송 실패');
      });
  }
}

// export class EmailService {
//   private transporter: Mail;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       host: 'smtp.naver.com',
//       service: 'Naver',
//       requireTLS: true,
//       secure: false,
//       port: 587,
//       auth: {
//         user: process.env.MAIL_EMAIL,
//         pass: process.env.MAIL_PASSWORD,
//       },
//     });
//   }
//   async senMail(email: string) {
//     try {
//       const message = {
//         from: 'jimin8830@naver.com',
//         to: 'jimin8830@naver.com',
//         subject: '이메일 인증 요청 메일입니다.',
//         html: '<p> 여기에 인증번호나 token 검증 URL 붙이시면 됩니다! </p>',
//       };
//       // const transporter = nodemailer.createTransport(mailConfig);
//       // transporter.sendMail(message);

//       return await this.transporter.sendMail(message);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
