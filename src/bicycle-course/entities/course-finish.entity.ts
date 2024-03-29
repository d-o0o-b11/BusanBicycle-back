import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BicycleCourseEntity } from './bicycle-course.entity';
import { UserEntity } from 'src/users/entities/user.entity';

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

  @ManyToOne(() => BicycleCourseEntity, { cascade: true })
  @JoinColumn({ name: 'course_id' })
  course: BicycleCourseEntity;

  @OneToOne(() => UserEntity, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
