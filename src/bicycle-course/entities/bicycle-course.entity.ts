import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
