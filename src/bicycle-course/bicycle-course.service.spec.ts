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
});
