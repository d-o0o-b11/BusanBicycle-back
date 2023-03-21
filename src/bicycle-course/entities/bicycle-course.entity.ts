import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @OneToOne(() => CourseLikeEntity, (m) => m.like)
  like: CourseLikeEntity;
}
