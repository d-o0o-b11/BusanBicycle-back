import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bicycle_air')
export class BicycleAirEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  gugun: string;

  @Column({ type: 'varchar' })
  pumpgubun: string;

  @Column({ type: 'varchar' })
  pumpsetcost: string;

  @Column({ type: 'text' })
  spot: string;
}
