import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
  Patch,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { BicycleCourseService } from './bicycle-course.service';
import { CreateBicycleCourseDto } from './dto/create-bicycle-course.dto';
import { FinishCourseDto } from './dto/finish-course.dto';
import { UserDto } from './dto/userId.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BicycleCourseEntity } from './entities/bicycle-course.entity';

@ApiTags('자전거 코스 api')
@Controller('bicycle-course')
export class BicycleCourseController {
  constructor(private readonly bicycleCourseService: BicycleCourseService) {}

  @ApiOperation({
    summary: '자전거 코스 데이터 저장',
  })
  @ApiBody({
    type: () => [CreateBicycleCourseDto],
    isArray: true,
  })
  @Post()
  async createBicycleCourse(
    @Body() createBicycleCourseDto: CreateBicycleCourseDto[],
  ) {
    return await this.bicycleCourseService.saveBicycleCourseData(
      createBicycleCourseDto,
    );
  }

  @ApiOperation({
    summary: '모든 자전거 코스 출력',
  })
  @ApiResponse({
    type: () => BicycleCourseEntity,
    status: HttpStatus.OK,
  })
  @Get()
  // @UseGuards(AuthGuard(JwtStrategy.key))
  async findBicycleCourse() {
    try {
      return await this.bicycleCourseService.findAllBicycleCourseData();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @ApiOperation({
    summary: '자전거 코스 좋아요 기능',
    description: '처음 좋아요 => save, 이미 누른 좋아요 취소 => delete',
  })
  @Patch('like')
  async bicycleCourseLikeCheck(@Body() data: UserDto) {
    return await this.bicycleCourseService.checkCourseLike(data);
  }

  @ApiOperation({
    summary: '자전거 코스 완주 기능',
    description: '처음 완주 => save, 이미 누른 완주 취소 => delete',
  })
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

  @ApiOperation({
    summary: '자전거 베스트 코스 출력',
  })
  @Get('bestCourse')
  async getBestCourse() {
    return await this.bicycleCourseService.getBestCourse();
  }

  @ApiOperation({
    summary: '자전거 코스 검색 기능',
  })
  @Get('find_course/:local')
  async findCourse(@Param('local') local: string, @Body() data) {
    return await this.bicycleCourseService.findAllCourse(local, data.user_id);
  }
}
