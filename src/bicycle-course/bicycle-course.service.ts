import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateBicycleCourseDto } from './dto/create-bicycle-course.dto';
import { BicycleCourseEntity } from './entities/bicycle-course.entity';
import { CourseLikeEntity } from './entities/course-like.entity';

@Injectable()
export class BicycleCourseService {
  constructor(
    @InjectRepository(BicycleCourseEntity)
    private readonly bicycleCourseRepository: Repository<BicycleCourseEntity>,

    @InjectRepository(CourseLikeEntity)
    private readonly courseLikeRepository: Repository<CourseLikeEntity>,
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

    return '저장 성공';
  }

  async findAllBicycleCourseData() {
    const result = await this.bicycleCourseRepository.find({
      relations: {
        like: true,
      },
    });

    const like = await this.courseLikeRepository.count();
    console.log('좋아요', like);

    // const test = result.map((n) => {
    //   n.gugunNm, n.startSpot, n.endSpot, n.like;
    // });

    // const test = await this.bicycleCourseRepository.createQueryBuilder

    return result;
  }

  async updateCourseLike(user_id) {
    return user_id;
  }
}
