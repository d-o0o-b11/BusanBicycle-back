import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('EmailService', () => {
  let service: EmailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mailerService).toBeDefined();
  });

  describe('sendMail', () => {
    const toEmail = '1111@naver.com';
    const randomNum = 100000;

    beforeEach(() => jest.spyOn(global.Math, 'floor').mockReturnValue(0));

    afterEach(() => {
      jest.spyOn(global.Math, 'floor').mockRestore();
    });

    it('sendMail', async () => {
      const sendMail = jest.spyOn(mailerService, 'sendMail');

      await service.sendMail(toEmail);

      expect(sendMail).toBeCalledTimes(1);
      expect(sendMail).toBeCalledWith({
        to: toEmail,
        from: 'jimin8830@naver.com',
        subject: '🎉 [부산 자전거 도로] 가입을 환영합니다! 🎉', // Subject line
        text: 'welcome nodemailer ', // plaintext body
        html: `<b>회원 가입을 환영합니다.</b> <div>인증 번호: ${randomNum}</div>`, // HTML body content
      });
    });
  });
});
