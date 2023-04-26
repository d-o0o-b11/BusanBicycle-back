import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { NotFoundException } from '@nestjs/common';

describe('EmailService', () => {
  let service: EmailService;
  let mailerService: MailerService;
  let userService: UsersService;

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
        {
          provide: UsersService,
          useValue: {
            findUserEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mailerService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('sendMail', () => {
    const toEmail = '1111@naver.com';
    const randomNum = 100000;

    beforeEach(() => jest.spyOn(global.Math, 'floor').mockReturnValue(0));

    afterEach(() => {
      jest.spyOn(global.Math, 'floor').mockRestore();
    });

    it('중복 이메일 존재', async () => {
      const findResult = jest
        .spyOn(userService, 'findUserEmail')
        .mockResolvedValue({
          id: 10,
          user_id: '22',
          user_pw: '22',
          email: 'jimin8830@naver.com',
          check: true,
          email_check: true,
        } as any); //왜 여기를 통과못하지

      await expect(
        async () => await service.sendMail(toEmail),
      ).rejects.toThrowError(new NotFoundException('존재하는 이메일입니다.'));

      expect(findResult).toBeCalledTimes(1);
      expect(findResult).toBeCalledWith(toEmail);
    });

    it('이메일 정상 작동', async () => {
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
