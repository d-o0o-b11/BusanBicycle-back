import { MapInterceptor } from '@automapper/nestjs';
import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { BicycleAirEntity } from './entities/bicycle-air.entity';
import { CreateBicycleAirDto } from './dto/create-bicycle-air.dto';

@Controller('bicycle-air')
export class BicycleAirController {
  @Post()
  async bicycleAirStation() {
    return 'hi';
  }
}
