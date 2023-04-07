import { Test, TestingModule } from '@nestjs/testing';
import { BicycleCourseService } from './bicycle-course.service';
import { Repository } from 'typeorm';
import { BicycleCourseEntity } from './entities/bicycle-course.entity';
import { CourseLikeEntity } from './entities/course-like.entity';
import { CourseFinishEntity } from './entities/course-finish.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from 'src/mock.repository';

describe('BicycleCourseService', () => {
  let service: BicycleCourseService;
  let bicycleCourseRepository: Repository<BicycleCourseEntity>;
  let courseLikeRepository: Repository<CourseLikeEntity>;
  let courseFinishRepository: Repository<CourseFinishEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BicycleCourseService,

        {
          provide: getRepositoryToken(BicycleCourseEntity),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(CourseLikeEntity),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(CourseFinishEntity),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<BicycleCourseService>(BicycleCourseService);
    bicycleCourseRepository = module.get<Repository<BicycleCourseEntity>>(
      getRepositoryToken(BicycleCourseEntity),
    );
    courseLikeRepository = module.get<Repository<CourseLikeEntity>>(
      getRepositoryToken(CourseLikeEntity),
    );
    courseFinishRepository = module.get<Repository<CourseFinishEntity>>(
      getRepositoryToken(CourseFinishEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveBicycleCourseData', () => {
    const saveResultDummyData = [
      {
        gugunNm: '부산광역시 해운대구',
        gugunWithWalk: '2.56',
        startSpot: '우동 1413-5',
        endSpot: '우동 1544',
        total: '2.56',
      },
    ];

    it('코스 데이터 한번에 저장', async () => {
      const saveResult = jest.spyOn(bicycleCourseRepository, 'save');

      await service.saveBicycleCourseData(saveResultDummyData);

      expect(saveResult).toBeCalledTimes(1);
      expect(saveResult).toBeCalledWith(saveResultDummyData);
    });
  });

  describe('findAllBicycleCourseData', () => {
    const resultDummyData = [
      {
        id: 1,
        gugunNm: '부산광역시 해운대구',
        gugunWithWalk: '2.56',
        startSpot: '우동 1413-5',
        endSpot: '우동 1544',
        total: '2.56',
        like: [],
      },
    ];

    it('모든 자전거 코스 출력', async () => {
      const result = jest
        .spyOn(bicycleCourseRepository, 'find')
        .mockResolvedValue(resultDummyData as any);

      await service.findAllBicycleCourseData();

      expect(result).toBeCalledTimes(1);
      expect(result).toBeCalledWith({
        relations: {
          like: true,
        },
        order: {
          id: 'ASC',
        },
      });
    });
  });

  describe('checkCourseLike', () => {
    const findDataFirst = {
      course_id: 1,
      user_id: 4,
      id: 24,
    };

    const findDataSecond = {
      raw: [],
      affected: 1,
    };

    const UserDummyData = {
      user_id: 4,
      course_id: 1,
    };

    it('처음 좋아요 누른 경우', async () => {
      const findData = jest
        .spyOn(courseLikeRepository, 'findOne')
        .mockResolvedValue(undefined);

      const saveCourseLike = jest
        .spyOn(service, 'saveCourseLike')
        .mockResolvedValue(findDataFirst as any);

      const deleteCourseLike = jest.spyOn(service, 'deleteCourseLike');

      await service.checkCourseLike(UserDummyData);

      expect(findData).toBeCalledTimes(1);
      expect(findData).toBeCalledWith({
        where: {
          course_id: UserDummyData.course_id,
          user_id: UserDummyData.user_id,
        },
      });

      expect(saveCourseLike).toBeCalledTimes(1);
      expect(saveCourseLike).toBeCalledWith(UserDummyData);

      expect(deleteCourseLike).toBeCalledTimes(0);
    });

    it('좋아요 누른 상태-> 지우기', async () => {
      const findData = jest
        .spyOn(courseLikeRepository, 'findOne')
        .mockResolvedValue(findDataFirst as any);

      const saveCourseLike = jest.spyOn(service, 'saveCourseLike');

      const deleteCourseLike = jest
        .spyOn(service, 'deleteCourseLike')
        .mockResolvedValue(findDataSecond);

      await service.checkCourseLike(UserDummyData);

      expect(findData).toBeCalledTimes(1);
      expect(findData).toBeCalledWith({
        where: {
          course_id: UserDummyData.course_id,
          user_id: UserDummyData.user_id,
        },
      });

      expect(saveCourseLike).toBeCalledTimes(0);

      expect(deleteCourseLike).toBeCalledTimes(1);
      expect(deleteCourseLike).toBeCalledWith(findDataFirst.id);
    });
  });

  describe('deleteCourseLike', () => {
    const id = 4;

    const UserDummyData = {
      user_id: 4,
      course_id: 1,
    };

    it('좋아요 삭제', async () => {
      const courseLikeDelete = jest.spyOn(courseLikeRepository, 'delete');

      await service.deleteCourseLike(id);

      expect(courseLikeDelete).toBeCalledTimes(1);
      expect(courseLikeDelete).toBeCalledWith(id);
    });

    it('좋아요 추가', async () => {
      const saveResult = jest.spyOn(courseLikeRepository, 'save');

      await service.saveCourseLike(UserDummyData);

      expect(saveResult).toBeCalledTimes(1);
      expect(saveResult).toBeCalledWith(UserDummyData);
    });
  });

  describe('checkCourseFinish', () => {
    const findDataDummyData = {
      user_id: 4,
      course_id: 1,
      id: 1,
    };

    const UserDummyData = {
      user_id: 4,
      course_id: 1,
    };

    it('완주 코스 삭제', async () => {
      const findData = jest
        .spyOn(courseFinishRepository, 'findOne')
        .mockResolvedValue(findDataDummyData as any);

      const deleteCourse = jest.spyOn(service, 'deleteFinishCourse');
      const saveCourse = jest.spyOn(service, 'saveFinishCourse');

      await service.checkCourseFinish(UserDummyData);

      expect(findData).toBeCalledTimes(1);
      expect(findData).toBeCalledWith({
        where: {
          course_id: UserDummyData.course_id,
          user_id: UserDummyData.user_id,
        },
      });

      expect(deleteCourse).toBeCalledTimes(1);
      expect(saveCourse).toBeCalledTimes(0);
    });

    it('완주 코스 저장', async () => {
      const findData = jest
        .spyOn(courseFinishRepository, 'findOne')
        .mockResolvedValue(undefined);

      const deleteCourse = jest.spyOn(service, 'deleteFinishCourse');
      const saveCourse = jest.spyOn(service, 'saveFinishCourse');

      await service.checkCourseFinish(UserDummyData);

      expect(findData).toBeCalledTimes(1);
      expect(findData).toBeCalledWith({
        where: {
          course_id: UserDummyData.course_id,
          user_id: UserDummyData.user_id,
        },
      });

      expect(deleteCourse).toBeCalledTimes(0);
      expect(saveCourse).toBeCalledTimes(1);
    });
  });

  describe('saveFinishCourse', () => {
    const UserDummyData = {
      user_id: 4,
      course_id: 1,
    };

    const id = 4;

    it('완주 코스 저장', async () => {
      const result = jest.spyOn(courseFinishRepository, 'save');

      await service.saveFinishCourse(UserDummyData);

      expect(result).toBeCalledTimes(1);
      expect(result).toBeCalledWith(UserDummyData);
    });

    it('완주 코스 취소', async () => {
      const deleteCourse = jest.spyOn(courseFinishRepository, 'delete');

      await service.deleteFinishCourse(id);

      expect(deleteCourse).toBeCalledTimes(1);
      expect(deleteCourse).toBeCalledWith(id);
    });
  });

  describe('getAllFinishCourse', () => {
    const id = 4;

    it('유저의 완주 목록 출력', async () => {
      const result = jest.spyOn(courseFinishRepository, 'find');

      await service.getAllFinishCourse(id);

      expect(result).toBeCalledTimes(1);
      expect(result).toBeCalledWith({
        where: {
          user_id: id,
        },
        relations: {
          course: true,
        },
      });
    });
  });
});
