import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateBicycleCourseDto } from './dto/create-bicycle-course.dto';
import { UserLiekDto } from './dto/userId.dto';
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
      order: {
        id: 'ASC',
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

  async checkCourseLike(data: UserLiekDto) {
    const findData = await this.courseLikeRepository.find({
      where: {
        course_id: data.course_id,
        user_id: data.user_id,
      },
    });

    if (findData) {
      return await this.deleteCourseLike(data.id);
    } else {
      return await this.saveCourseLike(data);
    }
  }

  /**
   * 좋아요 추가
   * @param data UserLikeDto
   * @returns
   */
  async saveCourseLike(data: UserLiekDto) {
    const entity = new CourseLikeEntity();

    entity.course_id = data.course_id;
    entity.user_id = data.user_id;

    return await this.courseLikeRepository.save(entity);
  }

  /**
   * 좋아요 삭제
   * @param id
   * @returns
   */
  async deleteCourseLike(id) {
    const findId = await this.courseLikeRepository.findOne({
      where: {
        id: id,
      },
    });

    if (findId) {
      return await this.courseLikeRepository.delete(id);
    } else {
      return new Error('존재하지 않는 코스 아이디입니다.');
    }

    // const test = await this.courseLikeRepository.delete(id);

    // return test;
  }
}
