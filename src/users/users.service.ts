import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { BicycleCourseService } from 'src/bicycle-course/bicycle-course.service';
import { LoginDto } from './dto/login-user.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private readonly bicycleService: BicycleCourseService,
    private readonly emailService: EmailService,
  ) {}

  async signup(data: CreateUserDto) {
    if (!data.check) {
      throw new Error('아이디 중복 체크해주세요!');
    }

    if (!data.email_check) {
      throw new Error('이메일 인증해주세요!');
    }

    const entity = new UserEntity();

    entity.user_id = data.user_id;
    entity.user_pw = data.user_pw;
    entity.check = data.check;
    entity.email = data.email;
    entity.email_check = data.email_check;

    const saveResult = await this.userRepository.save(entity);

    return saveResult;
  }

  async login(data: LoginDto) {
    const result = await this.userRepository.findOne({
      where: { user_id: data.user_id },
    });

    if (!result?.user_id) {
      throw new NotFoundException('존재하지 않는 아이디입니다.');
    } else if (result.user_pw != data.user_pw) {
      throw new NotFoundException('비밀번호가 틀렸습니다.');
    }
    /**
     * 2가지 방법 존재
     * 1. NotFoundExcepion으로 바로 날려서 ('존재하지 않는 아이디입니다) error처리, controller에서는
     * 예외 매핑 할 필요없이 service만 호출
     * 2. 커스텀 에러를 만들어서 controller에서 예외매핑하기
     *
     * -> 간단하면 1번 , 좀 복잡하면 2번
     */

    const payload = { id: result.id, user_id: data.user_id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async checkUserId(user_id: string) {
    const result = await this.userRepository.findOne({
      where: {
        user_id: user_id,
      },
    });

    console.log(this.jwtService.sign({ id: '30' }));

    if (result) throw new NotFoundException('중복된 아이디입니다.');

    return 'true';
  }

  async myPage(id: number) {
    const course_finsh = await this.bicycleService.getAllFinishCourse(id);

    return course_finsh;
  }

  async deleteUserInfo(id: number) {
    const deleteReslt = await this.userRepository.delete({
      id: id,
    });

    if (deleteReslt.affected > 0) {
      return '회원 탈퇴 성공';
    } else if (deleteReslt.affected == 0) {
      throw new Error('회원 탈퇴 실패');
    }
  }
}
