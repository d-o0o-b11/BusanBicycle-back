import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column('int4', { default: 0 })
  like: number;

  @Column('bool', { nullable: true, default: false })
  finish?: boolean | false;

  @OneToMany(() => UserEntity, (user) => user.course)
  @JoinColumn({ name: 'user' })
  user?: UserEntity;
}
