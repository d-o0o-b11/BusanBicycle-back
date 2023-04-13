import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateBicycleCourseDto } from './dto/create-bicycle-course.dto';
import { FinishCourseDto } from './dto/finish-course.dto';
import { UserDto } from './dto/userId.dto';
import { BicycleCourseEntity } from './entities/bicycle-course.entity';
import { CourseFinishEntity } from './entities/course-finish.entity';
import { CourseLikeEntity } from './entities/course-like.entity';

@Injectable()
export class BicycleCourseService {
  constructor(
    @InjectRepository(BicycleCourseEntity)
    private readonly bicycleCourseRepository: Repository<BicycleCourseEntity>,

    @InjectRepository(CourseLikeEntity)
    private readonly courseLikeRepository: Repository<CourseLikeEntity>,

    @InjectRepository(CourseFinishEntity)
    private readonly courseFinishRepository: Repository<CourseFinishEntity>,
  ) {}

  /**
   * 코스 데이터 한번에 저장하기 위한 api
   * @param createBicycleCourseDto
   * @returns 저장 성공
   */
  async saveBicycleCourseData(
    createBicycleCourseDto: CreateBicycleCourseDto[],
  ) {
    const saveResult = createBicycleCourseDto.map((idx) => {
      const entity = new BicycleCourseEntity();
      entity.gugunnm = idx.gugunnm;
      entity.gugunWithWalk = idx.gugunWithWalk;
      entity.startSpot = idx.startSpot;
      entity.endSpot = idx.endSpot;
      entity.total = idx.total;
      return entity;
    });

    await this.bicycleCourseRepository.save(saveResult);

    return '저장 성공';
  }

  /**
   *
   * @returns 모든 코스 데이터 출력
   */
  async findAllBicycleCourseData() {
    const result = await this.bicycleCourseRepository.find({
      relations: {
        like: true,
      },
      order: {
        id: 'ASC',
      },
    });

    return result;
  }

  /**
   * 좋아요 기능
   * @param data 유저 id, 코스 id
   * @returns ...
   */
  async checkCourseLike(data: UserDto) {
    // (2, 4), (10, 4)
    const findData = await this.courseLikeRepository.findOne({
      where: {
        course_id: data.course_id,
        user_id: data.user_id, // < -- 유니크 제약 제거
      },
    });

    if (findData) {
      return await this.deleteCourseLike(findData.id);
    } else {
      return await this.saveCourseLike(data);
    }
  }

  /**
   * 좋아요 추가
   * @param data UserLikeDto
   * @returns
   */
  async saveCourseLike(data: UserDto) {
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
  async deleteCourseLike(id: number) {
    return await this.courseLikeRepository.delete(id);
  }

  /**
   * 최종 완주 서비스
   * @param data
   * @returns
   */
  async checkCourseFinish(data: UserDto) {
    const findData = await this.courseFinishRepository.findOne({
      where: {
        course_id: data.course_id,
        user_id: data.user_id,
      },
    });

    if (findData) {
      return await this.deleteFinishCourse(findData.id);
    } else {
      return await this.saveFinishCourse(data);
    }
  }

  /**
   * 완주 저장
   */
  async saveFinishCourse(data: UserDto) {
    const entity = new CourseFinishEntity();

    entity.course_id = data.course_id;
    entity.user_id = data.user_id;

    const result = await this.courseFinishRepository.save(entity);

    return result;
  }

  /**
   * 완주 취소
   */
  async deleteFinishCourse(id: number) {
    return await this.courseFinishRepository.delete(id);
  }

  /**
   * 유저의 완주 목록 출력
   * @param data
   * @returns
   */
  async getAllFinishCourse(id: number) {
    const result = await this.courseFinishRepository.find({
      where: {
        user_id: id,
      },
      relations: {
        course: true,
      },
    });

    return result;
  }

  /**
   * 베스트 코스 순으로 출력 (좋아요 순)
   * @returns 좋아요 높은 순
   */
  async getBestCourse() {
    const subQueryBuiilder = this.bicycleCourseRepository
      .createQueryBuilder()
      .subQuery()
      .select('cl.course_id, count(*)')
      .from(CourseLikeEntity, 'cl')
      .groupBy('cl.course_id');

    const result = await this.bicycleCourseRepository
      .createQueryBuilder('bestcourse')
      .select(['bestcourse.*', 'clike.*'])
      .leftJoin(
        subQueryBuiilder.getQuery(),
        'clike',
        'bestcourse.id=clike.course_id',
      )
      .orderBy('count')
      .getRawMany();

    return result;
  }
  /**
 * select *
  from bicycle_course bc 
  left join(
    select course_id, count(course_id)
    from course_like cl 
    group by course_id
  ) as clike
  on id=clike.course_id
 */

  /**
   *
   * @param local
   * @param user_id
   * @returns 모든 코스, 완주한 코스id, 좋아요 누른 코스 id
   */
  async findAllCourse(local: string, user_id?: number) {
    const findCourse = await this.bicycleCourseRepository
      .createQueryBuilder()
      .select('*')
      .where('gugunnm like :local', { local: `%${local}%` })
      .getRawMany();

    if (user_id) {
      const finish_course = await this.courseFinishRepository.find({
        where: {
          user_id: user_id,
        },
        order: {
          course_id: 'asc',
        },
      });

      const like_course = await this.courseLikeRepository.find({
        where: {
          user_id: user_id,
        },
        order: {
          course_id: 'asc',
        },
      });

      return [
        findCourse,
        finish_course.map((e) => e.course_id),
        like_course.map((e) => e.course_id),
      ];
    } else {
      return findCourse;
    }
  }
}
