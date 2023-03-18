import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwtToken.strategy';
import { BicycleCourseService } from './bicycle-course.service';
import { CreateBicycleCourseDto } from './dto/create-bicycle-course.dto';

@Controller('bicycle-course')
export class BicycleCourseController {
  constructor(private readonly bicycleCourseService: BicycleCourseService) {}

  // 자전거 코스 저장 api
  @Post()
  createBicycleCourse(
    @Body() createBicycleCourseDto: CreateBicycleCourseDto[],
  ) {
    return this.bicycleCourseService.saveBicycleCourseData(
      createBicycleCourseDto,
    );
  }

  @Get()
  @UseGuards(AuthGuard(JwtStrategy.key))
  findBicycleCourse() {
    try {
      return this.bicycleCourseService.findAllBicycleCourseData();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
