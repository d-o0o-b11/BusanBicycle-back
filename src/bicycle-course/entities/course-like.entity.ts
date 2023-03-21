import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BicycleCourseEntity } from './bicycle-course.entity';
@Entity('course_like')
export class CourseLikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int4')
  user_id: number;

  @Column('int4')
  course_id: number;

  @ManyToOne(() => BicycleCourseEntity)
  @JoinColumn({ name: 'course_id' })
  course: BicycleCourseEntity;
}
