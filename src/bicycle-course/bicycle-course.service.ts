import { Injectable } from '@nestjs/common';
import { CreateBicycleCourseDto } from './dto/create-bicycle-course.dto';
import { UpdateBicycleCourseDto } from './dto/update-bicycle-course.dto';

@Injectable()
export class BicycleCourseService {
  create(createBicycleCourseDto: CreateBicycleCourseDto) {
    return 'This action adds a new bicycleCourse';
  }

  findAll() {
    return `This action returns all bicycleCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bicycleCourse`;
  }

  update(id: number, updateBicycleCourseDto: UpdateBicycleCourseDto) {
    return `This action updates a #${id} bicycleCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} bicycleCourse`;
  }
}
