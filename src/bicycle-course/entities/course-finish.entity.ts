import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CourseFinishEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  user_id: string;

  @Column('int4')
  course_id: number;
}
