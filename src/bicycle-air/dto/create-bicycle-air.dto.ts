import { PickType } from '@nestjs/swagger';
import { BicycleAirEntity } from '../entities/bicycle-air.entity';
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class CreateBicycleAirDto extends PickType(BicycleAirEntity, [
  'gugun',
  'pumpgubun',
  'pumpsetcost',
  'spot',
]) {
  @AutoMap()
  @IsString()
  gugun: string;

  @AutoMap()
  @IsString()
  pumpgubun: string;

  @AutoMap()
  @IsString()
  pumpsetcost: string;

  @AutoMap()
  @IsString()
  spot: string;
}
