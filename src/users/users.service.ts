import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(data: CreateUserDto) {
    const entity = new UserEntity();

    entity.user_id = data.user_id;
    entity.user_pw = data.user_pw;

    const saveResult = await this.userRepository.save(entity);

    return saveResult;
  }

  async login(data: CreateUserDto) {
    const result = await this.userRepository.findOne({
      where: { user_id: data.user_id },
    });

    if (!result.user_id) {
      throw new NotFoundException('존재하지 않는 아이디입니다.');
    } else if (result.user_pw != data.user_pw) {
      throw new NotFoundException('비밀번호가 틀렸습니다.');
    }

    const payload = { user_id: data.user_id };

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

    if (result) throw new NotFoundException('중복된 아이디입니다.');

    return 'true';
  }
}
