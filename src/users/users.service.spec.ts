import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../mock.repository';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<UserEntity>;
  let jwtService: JwtService;

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
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    jwtService = module.get<JwtService>(JwtService);
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
        .mockResolvedValue({ ...dummyDateTrue, id: 1 });
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
      });

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
      });

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
    };

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
});
