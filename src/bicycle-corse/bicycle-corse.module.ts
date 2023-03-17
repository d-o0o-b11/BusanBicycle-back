import { Module } from '@nestjs/common';
import { BicycleCorseService } from './bicycle-corse.service';
import { BicycleCorseController } from './bicycle-corse.controller';

@Module({
  controllers: [BicycleCorseController],
  providers: [BicycleCorseService]
})
export class BicycleCorseModule {}
