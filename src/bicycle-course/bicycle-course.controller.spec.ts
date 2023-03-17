import { Test, TestingModule } from '@nestjs/testing';
import { BicycleCourseController } from './bicycle-course.controller';
import { BicycleCourseService } from './bicycle-course.service';

describe('BicycleCourseController', () => {
  let controller: BicycleCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BicycleCourseController],
      providers: [BicycleCourseService],
    }).compile();

    controller = module.get<BicycleCourseController>(BicycleCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
