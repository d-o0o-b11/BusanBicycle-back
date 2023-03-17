import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bicycle_course')
export class BicycleCorse {
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

  @Column('int4')
  total: number;

  @Column('int4')
  like: number;

  @Column('bool')
  finish: boolean;

  // "total": "2.56",
  //         "gugunNm": "부산광역시 해운대구",
  //         "gugunWithWalk": "2.56",
  //         "startSpot": "우동 1413-5",
  //         "endSpot": "우동 1544"
}
