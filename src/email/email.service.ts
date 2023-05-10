import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { BicycleCourseService } from 'src/bicycle-course/bicycle-course.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UsersService,
    private readonly bicycleService: BicycleCourseService,
  ) {}

  public async sendMail(toEmail: string) {
    const findEmail = await this.userService.findUserEmail(toEmail);

    if (findEmail) {
      throw new NotFoundException('존재하는 이메일입니다.');
    }

    const randomNum: number = Math.floor(Math.random() * 900000) + 100000;

    try {
      this.mailerService.sendMail({
        to: toEmail,
        from: 'jimin8830@naver.com',
        subject: '🎉 [부산 자전거 도로] 가입을 환영합니다! 🎉',
        text: 'welcome nodemailer ',
        html: `<b>회원 가입을 환영합니다.</b> <div>인증 번호: ${randomNum}</div>`,
      });

      return randomNum;
    } catch (e) {
      throw new Error('이메일 전송 실패');
    }
  }

  @Cron('0 0 10 * * 1')
  public async sendBestCourse() {
    const course = await this.bicycleService.getBestCourse();
    const bestCourseArr = [];

    course.slice(0, 5).map((value, index) => {
      bestCourseArr.push(value);
    });

    const emailBody = `
    <h1>BEST COURSE</h1>
    <br>
      ${bestCourseArr
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
    const users = await this.userService.findUser();

    try {
      for (const user of users) {
        await this.mailerService.sendMail({
          to: user.email,
          from: 'jimin8830@naver.com',
          subject: '[부산 자전거 도로] 이번주 베스트 코스!',
          html: emailBody,
        });
      }
    } catch (e) {
      throw new Error('이메일 전송 실패');
    }
  }
}
