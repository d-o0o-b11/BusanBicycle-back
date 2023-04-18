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
import { ApiProperty } from '@nestjs/swagger';

@Entity('bicycle_course')
export class BicycleCourseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '자전거 코스 id',
    example: 1,
  })
  id: number;

  @Column('varchar')
  @ApiProperty({
    description: '구군명',
    example: '부산광역시 해운대구',
  })
  gugunnm: string;

  @Column('varchar')
  @ApiProperty({
    description: '총 길이',
    example: '2.56',
  })
  gugunWithWalk: string;

  @Column('varchar')
  @ApiProperty({
    description: '시작 시점',
    example: '우동 1413-4',
  })
  startSpot: string;

  @Column('varchar')
  @ApiProperty({
    description: '종료 시점',
    example: '우동 1544',
  })
  endSpot: string;

  @Column('varchar')
  @ApiProperty({
    description: '총 길이',
    example: '2.56',
  })
  total: string;

  @OneToMany(() => CourseLikeEntity, (m) => m.course)
  like: CourseLikeEntity[];

  @OneToMany(() => CourseFinishEntity, (m) => m.course)
  finish: CourseFinishEntity[];
}
