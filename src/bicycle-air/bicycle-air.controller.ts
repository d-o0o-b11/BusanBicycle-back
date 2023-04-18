import { MapInterceptor } from '@automapper/nestjs';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { BicycleAirEntity } from './entities/bicycle-air.entity';
import { CreateBicycleAirDto } from './dto/create-bicycle-air.dto';
import { BicycleAirService } from './bicycle-air.service';

@Controller('bicycle-air')
export class BicycleAirController {
  constructor(private readonly bicycleAirService: BicycleAirService) {}

  @Post()
  async bicycleAirStation(@Body() dto: CreateBicycleAirDto[]) {
    return await this.bicycleAirService.saveAirStaion(dto);
  }
}
