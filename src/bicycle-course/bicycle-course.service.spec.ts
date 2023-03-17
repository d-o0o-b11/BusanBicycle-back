import { Test, TestingModule } from '@nestjs/testing';
import { BicycleCourseService } from './bicycle-course.service';

describe('BicycleCourseService', () => {
  let service: BicycleCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BicycleCourseService],
    }).compile();

    service = module.get<BicycleCourseService>(BicycleCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
