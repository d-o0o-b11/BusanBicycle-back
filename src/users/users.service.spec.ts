import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../mock.repository';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';
import { BicycleCourseService } from 'src/bicycle-course/bicycle-course.service';
import { CourseFinishEntity } from 'src/bicycle-course/entities/course-finish.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<UserEntity>;
  let jwtService: JwtService;
  let bicycleService: BicycleCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository(),
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: BicycleCourseService,
          useValue: {
            getAllFinishCourse: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    jwtService = module.get<JwtService>(JwtService);
    bicycleService = module.get<BicycleCourseService>(BicycleCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('signup', () => {
    const dummyDateFalse: CreateUserDto = {
      user_id: '11',
      user_pw: '11',
      check: false,
    };

    const dummyDateTrue = {
      user_id: '11',
      user_pw: '11',
      check: true,
    };

    it('아이디 중복 체크 false', async () => {
      await expect(
        async () => await service.signup(dummyDateFalse),
      ).rejects.toThrowError(new Error('아이디 중복 체크해주세요'));
    });

    it('아이디 중복 체크 true', async () => {
      const saveResult = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue({ ...dummyDateTrue, id: 1 } as any);
      await service.signup(dummyDateTrue);

      expect(saveResult).toBeCalledTimes(1);
      expect(saveResult).toBeCalledWith(dummyDateTrue);
    });
  });

  describe('login', () => {
    const dummyData = {
      user_id: '11',
      user_pw: '11',
      check: true,
    };

    it('존재하지 않는 아이디인 경우', async () => {
      const result = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(null);

      await expect(
        async () => await service.login(dummyData),
      ).rejects.toThrowError(
        new NotFoundException('존재하지 않는 아이디입니다.'),
      );
      expect(result).toBeCalledTimes(1);
      expect(result).toBeCalledWith({
        where: { user_id: dummyData.user_id },
      });
    });

    it('비밀번호가 틀렸습니다.', async () => {
      const result = jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: 3,
        user_id: '11',
        user_pw: '12',
        check: true,
      } as any);

      await expect(async () => service.login(dummyData)).rejects.toThrowError(
        new NotFoundException('비밀번호가 틀렸습니다.'),
      );
      expect(result).toBeCalledTimes(1);
      expect(result).toBeCalledWith({
        where: { user_id: dummyData.user_id },
      });
    });

    it('로그인 성공', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: 3,
        user_id: '11',
        user_pw: '11',
        check: true,
      } as any);

      const token = jest.spyOn(jwtService, 'sign');
      await service.login(dummyData);

      expect(token).toBeCalledTimes(1);
    });
  });

  describe('checkUserId', () => {
    const user_id = '11';

    const dummyData = {
      id: 3,
      user_id: '11',
      user_pw: '11',
      check: true,
    } as any;

    it('중복된 아이디인 경우', async () => {
      const result = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(dummyData);

      await expect(
        async () => await service.checkUserId(user_id),
      ).rejects.toThrowError(new NotFoundException('중복된 아이디입니다.'));

      expect(result).toBeCalledTimes(1);
      expect(result).toBeCalledWith({
        where: {
          user_id: user_id,
        },
      });
    });

    it('중복아이디 확인 성공', async () => {
      const result = jest.spyOn(userRepository, 'findOne');

      await service.checkUserId(user_id);

      expect(result).toBeCalledTimes(1);
      expect(result).toBeCalledWith({
        where: {
          user_id: user_id,
        },
      });
    });
  });

  describe('myPage', () => {
    const finishDummyData = [
      {
        id: 8,
        user_id: 4,
        course_id: 2,
        finish_date: '2023-04-06T05:40:37.627Z',
        course: {
          id: 2,
          gugunnm: '부산광역시 해운대구',
          gugunWithWalk: '1.84',
          startSpot: '우동 1500',
          endSpot: '우동 1430',
          total: '1.84',
        },
      },
    ];

    const id = 8;

    it('완주한 코스 출력', async () => {
      const course_finsh = jest
        .spyOn(bicycleService, 'getAllFinishCourse')
        .mockResolvedValue(finishDummyData as any);

      await service.myPage(id);

      expect(course_finsh).toBeCalledTimes(1);
      expect(course_finsh).toBeCalledWith(id);
    });
  });

  describe('deleteUserInfo', () => {
    const id = 11;

    const deleteOk = {
      raw: [],
      affected: 1,
    };

    const deleteFail = {
      raw: [],
      affected: 0,
    };

    it('회원 탛퇴 성공', async () => {
      const deleteReslt = jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue(deleteOk);

      await service.deleteUserInfo(id);

      expect(deleteReslt).toBeCalledTimes(1);
      expect(deleteReslt).toBeCalledWith({
        id: id,
      });
    });

    it('회원 탈퇴 실패', async () => {
      const deleteReslt = jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue(deleteFail);

      await expect(
        async () => await service.deleteUserInfo(id),
      ).rejects.toThrowError(new Error('회원 탈퇴 실패'));

      expect(deleteReslt).toBeCalledTimes(1);
    });
  });
});
