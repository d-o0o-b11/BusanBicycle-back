import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bicycle_air')
export class BicycleAirEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: 'varchar' })
  gugun: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  pumpgubun: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  pumpsetcost: string;

  @AutoMap()
  @Column({ type: 'text' })
  spot: string;
}
