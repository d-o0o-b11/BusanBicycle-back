import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BicycleCourseEntity } from './bicycle-course.entity';
@Entity('course_like')
export class CourseLikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  user_id: string;

  @Column('int4')
  course_id: number;

  @OneToOne(() => BicycleCourseEntity)
  @JoinColumn({ name: 'course_id' })
  like: BicycleCourseEntity;
}
