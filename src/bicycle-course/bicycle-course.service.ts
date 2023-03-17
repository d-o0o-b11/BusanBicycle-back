import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBicycleCourseDto } from './dto/create-bicycle-course.dto';
import { UpdateBicycleCourseDto } from './dto/update-bicycle-course.dto';
import { BicycleCourseEntity } from './entities/bicycle-course.entity';

@Injectable()
export class BicycleCourseService {
  constructor(
    @InjectRepository(BicycleCourseEntity)
    private readonly bicycleCourseRepository: Repository<BicycleCourseEntity>,
  ) {}

  async saveBicycleCourseData(
    createBicycleCourseDto: CreateBicycleCourseDto[],
  ) {
    const saveResult = createBicycleCourseDto.map((idx) => {
      const entity = new BicycleCourseEntity();
      entity.gugunNm = idx.gugunNm;
      entity.gugunWithWalk = idx.gugunWithWalk;
      entity.startSpot = idx.startSpot;
      entity.endSpot = idx.endSpot;
      entity.total = idx.total;
      return entity;
    });

    await this.bicycleCourseRepository.save(saveResult);

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
