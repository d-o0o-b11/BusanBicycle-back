import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckIdDto } from './dto/checkid-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.signup(createUserDto);
  }

  @Get('/login')
  async findlogin(@Body() loginData: CreateUserDto) {
    try {
      return await this.usersService.login(loginData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(error);
    }
  }

  @Get('/logincheck')
  async checkUserId(@Body() data: CheckIdDto) {
    try {
      return await this.usersService.checkUserId(data.user_id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
