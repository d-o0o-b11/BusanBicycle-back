import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckIdDto } from './dto/checkid-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Token } from 'src/auth/decorator/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.signup(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
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

  @Get('myPage')
  @UseGuards(JwtAuthGuard)
  async getUserPage(@Token() token) {
    //@Request() req
    console.log(token);
  }
}
