import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseFinishEntity } from './course-finish.entity';
import { CourseLikeEntity } from './course-like.entity';

@Entity('bicycle_course')
export class BicycleCourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  gugunNm: string;

  @Column('varchar')
  gugunWithWalk: string;

  @Column('varchar')
  startSpot: string;

  @Column('varchar')
  endSpot: string;

  @Column('varchar')
  total: string;

  @OneToMany(() => CourseLikeEntity, (m) => m.course)
  like: CourseLikeEntity[];

  @OneToMany(() => CourseFinishEntity, (m) => m.course)
  finish: CourseFinishEntity[];
}
