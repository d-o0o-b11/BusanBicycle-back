import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BicycleCourseService } from './bicycle-course.service';
import { CreateBicycleCourseDto } from './dto/create-bicycle-course.dto';
import { UpdateBicycleCourseDto } from './dto/update-bicycle-course.dto';

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
  findBicycleCourse() {
    return this.bicycleCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bicycleCourseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBicycleCourseDto: UpdateBicycleCourseDto,
  ) {
    return this.bicycleCourseService.update(+id, updateBicycleCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bicycleCourseService.remove(+id);
  }
}
