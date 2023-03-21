import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BicycleCourseEntity } from './bicycle-course.entity';

@Entity('course_finish')
export class CourseFinishEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int4')
  user_id: number;

  @Column('int4')
  course_id: number;

  @CreateDateColumn()
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  finish_date: Date;

  @ManyToOne(() => BicycleCourseEntity)
  @JoinColumn({ name: 'course_id' })
  course: BicycleCourseEntity;
}
