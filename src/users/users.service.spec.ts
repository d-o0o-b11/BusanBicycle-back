import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../mock.repository';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<UserEntity>;

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
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
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
});
