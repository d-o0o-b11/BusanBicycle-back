import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bicycle_air')
export class BicycleAirEntity {
  @AutoMap()
  @ApiProperty({
    description: '공기 주입소 id',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @ApiProperty({
    description: '공기 주입소 구간',
    example: '부산광역시 해운대구',
  })
  @Column({ type: 'varchar' })
  gugun: string;

  @AutoMap()
  @ApiProperty({
    description: '공기 주입소 펌프',
    example: '태양광',
  })
  @Column({ type: 'varchar' })
  pumpgubun: string;

  @AutoMap()
  @ApiProperty({
    description: '공기 주입소 비용',
    example: '1730000',
  })
  @Column({ type: 'varchar' })
  pumpsetcost: string;

  @AutoMap()
  @ApiProperty({
    description: '공기 주입소 상세 주소',
    example: '지하철 장산역 5번 출구 주변',
  })
  @Column({ type: 'text' })
  spot: string;
}
