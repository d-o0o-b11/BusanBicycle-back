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
import { UserLiekDto } from './dto/userId.dto';

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
  async bicycleCourseLikeCheck(@Body() data: UserLiekDto) {
    return await this.bicycleCourseService.checkCourseLike(data);
  }

  // @Post('like')
  // async bicycleCourseLike(@Body() data: UserLiekDto) {
  //   return await this.bicycleCourseService.saveCourseLike(data);
  // }

  // @Delete('like')
  // async bicycleCourseLikeDel(@Body() data) {
  //   return await this.bicycleCourseService.deleteCourseLike(data);
  // }
}
