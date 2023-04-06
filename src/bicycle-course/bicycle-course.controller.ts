import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  InternalServerErrorException,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwtToken.strategy';
import { BicycleCourseService } from './bicycle-course.service';
import { CreateBicycleCourseDto } from './dto/create-bicycle-course.dto';
import { FinishCourseDto } from './dto/finish-course.dto';
import { UserDto } from './dto/userId.dto';

@Controller('bicycle-course')
export class BicycleCourseController {
  constructor(private readonly bicycleCourseService: BicycleCourseService) {}

  // 자전거 코스 저장 api
  @Post()
  async createBicycleCourse(
    @Body() createBicycleCourseDto: CreateBicycleCourseDto[],
  ) {
    return await this.bicycleCourseService.saveBicycleCourseData(
      createBicycleCourseDto,
    );
  }

  @Get()
  // @UseGuards(AuthGuard(JwtStrategy.key))
  async findBicycleCourse() {
    try {
      return await this.bicycleCourseService.findAllBicycleCourseData();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('like')
  async bicycleCourseLikeCheck(@Body() data: UserDto) {
    return await this.bicycleCourseService.checkCourseLike(data);
  }

  @Patch('finish')
  async bicycleCourseFinish(@Body() data: FinishCourseDto) {
    return await this.bicycleCourseService.checkCourseFinish(data);
  }

  // @Delete('finish')
  // async deleteCourseFinish(@Body() data) {
  //   return await this.bicycleCourseService.deleteFinishCourse(data.id);
  // }

  /**
   * 유저 완주 목록 출력
   * @param data
   * @returns
   */
  // @Get('finish')
  // async getCourseFinish(@Body() data) {
  //   return await this.bicycleCourseService.getAllFinishCourse(data);
  // }
  //--> 토큰 인증 절차를 거치기 위해서 user 폴더로 이동!! service만 ㅅㅏ용

  @Get('bestCourse')
  async getBestCourse() {
    return await this.bicycleCourseService.getBestCourse();
  }
}
