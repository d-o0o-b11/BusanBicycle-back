import { Module } from '@nestjs/common';
import { BicycleAirService } from './bicycle-air.service';
import { BicycleAirController } from './bicycle-air.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicycleAirEntity } from './entities/bicycle-air.entity';
import { AirProfile } from './mapper/bicycle-air.mapper';

const entity = TypeOrmModule.forFeature([BicycleAirEntity]);
@Module({
  imports: [entity],
  controllers: [BicycleAirController],
  providers: [BicycleAirService, AirProfile],
})
export class BicycleAirModule {}
