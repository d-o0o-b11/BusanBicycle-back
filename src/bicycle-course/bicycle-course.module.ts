import { Module } from '@nestjs/common';
import { BicycleCourseService } from './bicycle-course.service';
import { BicycleCourseController } from './bicycle-course.controller';

@Module({
  controllers: [BicycleCourseController],
  providers: [BicycleCourseService]
})
export class BicycleCourseModule {}
