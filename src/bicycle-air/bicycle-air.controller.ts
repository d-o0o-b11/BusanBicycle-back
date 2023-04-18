import { Body, Controller, Post } from '@nestjs/common';
import { CreateBicycleAirDto } from './dto/create-bicycle-air.dto';
import { BicycleAirService } from './bicycle-air.service';

@Controller('bicycle-air')
export class BicycleAirController {
  constructor(private readonly bicycleAirService: BicycleAirService) {}

  @Post()
  async bicycleAirStation(@Body() dto: CreateBicycleAirDto[]) {
    return await this.bicycleAirService.saveAirStation(dto);
  }
}
