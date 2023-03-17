import { Module } from '@nestjs/common';
import { BicycleCourseService } from './bicycle-course.service';
import { BicycleCourseController } from './bicycle-course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicycleCourseEntity } from './entities/bicycle-course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BicycleCourseEntity])],
  controllers: [BicycleCourseController],
  providers: [BicycleCourseService],
})
export class BicycleCourseModule {}
