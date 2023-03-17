import { BicycleCourseEntity } from 'src/bicycle-course/entities/bicycle-course.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MyPageEntity } from './mypage.entity';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  user_id: string;

  @Column({ type: 'varchar', length: 30 })
  user_pw: string;

  @OneToOne((type) => MyPageEntity, (user) => user.userInfo)
  mypage: MyPageEntity;

  @ManyToOne(() => BicycleCourseEntity, (course) => course.user)
  course?: BicycleCourseEntity;
}
