import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
  HttpStatus,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckIdDto } from './dto/checkid-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Token } from 'src/auth/decorator/auth.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login-user.dto';
import { JwtToken } from 'src/auth/jwt-token.dto';

@ApiTags('유저 api')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '회원가입',
  })
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.signup(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiOperation({
    summary: '로그인',
  })
  @Post('login')
  async findlogin(@Body() loginData: LoginDto) {
    try {
      return await this.usersService.login(loginData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(error);
    }
  }

  @ApiOperation({
    summary: '아이디 중복 체크',
  })
  @Get('logincheck')
  async checkUserId(@Query('user_id') user_id: string) {
    try {
      return await this.usersService.checkUserId(user_id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiOperation({
    summary: '유저의 완주 목록',
  })
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse({
    description: 'Jwt 인가 실패',
    status: HttpStatus.UNAUTHORIZED,
  })
  @Get('myPage')
  @UseGuards(JwtAuthGuard)
  async getUserPage(@Token() token: JwtToken) {
    return await this.usersService.myPage(token.id);
  }

  @ApiOperation({
    summary: '회원 탈퇴',
  })
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse({
    description: 'Jwt 인가 실패',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '회원 탈퇴 성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '회원 탈퇴 실패',
  })
  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Token() token: JwtToken) {
    try {
      return await this.usersService.deleteUserInfo(token.id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
