import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { NotFoundException } from '@nestjs/common';
import { BicycleCourseService } from 'src/bicycle-course/bicycle-course.service';

describe('EmailService', () => {
  let service: EmailService;
  let mailerService: MailerService;
  let userService: UsersService;
  let bicycleService: BicycleCourseService;

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
            findUser: jest.fn(),
          },
        },
        {
          provide: BicycleCourseService,
          useValue: {
            getBestCourse: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
    userService = module.get<UsersService>(UsersService);
    bicycleService = module.get<BicycleCourseService>(BicycleCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mailerService).toBeDefined();
    expect(userService).toBeDefined();
    expect(bicycleService).toBeDefined();
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
        } as any);

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

  describe('sendBestCourse', () => {
    const dummyData = [
      {
        gugunnm: 1,
        startSpot: 'test',
        endSpot: 'test2',
        gugunWithWalk: '12.1',
      },
      {
        gugunnm: 2,
        startSpot: 'test',
        endSpot: 'test2',
        gugunWithWalk: '12.1',
      },
    ];

    const dummyUser = [{ email: '12312' }, { email: '234' }];

    it('월요일마다 이메일 전송', async () => {
      const course = jest
        .spyOn(bicycleService, 'getBestCourse')
        .mockResolvedValue(dummyData);

      const emailBody = `
      <h1>BEST COURSE</h1>
      <br>
        ${dummyData
          .map(
            (item) =>
              `<li>
              ${item.gugunnm} << 시작지점: ${item.startSpot} , 종료지점: ${item.endSpot} >> ${item.gugunWithWalk}km
              </li>
              <hr/>
              `,
          )
          .join('')}
      </br>
      `;

      const users = jest
        .spyOn(userService, 'findUser')
        .mockResolvedValue(dummyUser as any);

      const sendMail = jest.spyOn(mailerService, 'sendMail');

      await service.sendBestCourse();
    });
  });
});
