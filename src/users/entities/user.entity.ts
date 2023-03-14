import {
  Column,
  Entity,
  JoinColumn,
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
}
