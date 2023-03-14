import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('mypage')
export class MyPageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_course: string;

  @Column('int', { default: 0 })
  user_stamp: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user' })
  userInfo: UserEntity;
}
