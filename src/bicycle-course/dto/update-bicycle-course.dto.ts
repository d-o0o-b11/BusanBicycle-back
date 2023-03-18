import { PartialType } from '@nestjs/swagger';
import { CreateBicycleCourseDto } from './create-bicycle-course.dto';

export class UpdateBicycleCourseDto extends PartialType(
  CreateBicycleCourseDto,
) {}
