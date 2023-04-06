import { CourseFinishEntity } from 'src/bicycle-course/entities/course-finish.entity';
import { CourseLikeEntity } from 'src/bicycle-course/entities/course-like.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  user_id: string;

  @Column({ type: 'varchar', length: 30 })
  user_pw: string;

  @Column({ type: 'bool', default: false })
  check: boolean;

  @OneToOne(() => CourseLikeEntity, (c) => c.user)
  like: CourseLikeEntity;

  @OneToOne(() => CourseFinishEntity, (c) => c.user)
  finish: CourseFinishEntity;
}
