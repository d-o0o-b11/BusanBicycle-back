import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('course_like')
export class CourseLikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  user_id: string;

  @Column('int4')
  course_id: number;
}
