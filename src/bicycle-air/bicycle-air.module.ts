import { Module } from '@nestjs/common';
import { BicycleAirService } from './bicycle-air.service';
import { BicycleAirController } from './bicycle-air.controller';

@Module({
  controllers: [BicycleAirController],
  providers: [BicycleAirService]
})
export class BicycleAirModule {}
