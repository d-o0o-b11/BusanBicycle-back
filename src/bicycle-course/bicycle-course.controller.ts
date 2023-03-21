import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  InternalServerErrorException,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwtToken.strategy';
import { BicycleCourseService } from './bicycle-course.service';
import { CreateBicycleCourseDto } from './dto/create-bicycle-course.dto';
import { UserIdDto } from './dto/userId.dto';

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
  async bicycleCourseLike(@Body() data: UserIdDto) {
    return await this.bicycleCourseService.updateCourseLike(data.user_id);
  }
}
