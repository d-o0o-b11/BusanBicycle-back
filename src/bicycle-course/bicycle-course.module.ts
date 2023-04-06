import { Module } from '@nestjs/common';
import { BicycleCourseService } from './bicycle-course.service';
import { BicycleCourseController } from './bicycle-course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicycleCourseEntity } from './entities/bicycle-course.entity';
import { CourseLikeEntity } from './entities/course-like.entity';
import { CourseFinishEntity } from './entities/course-finish.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BicycleCourseEntity,
      CourseLikeEntity,
      CourseFinishEntity,
    ]),
  ],
  controllers: [BicycleCourseController],
  providers: [BicycleCourseService],
  exports: [BicycleCourseService],
})
export class BicycleCourseModule {}
