import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BicycleAirService } from './bicycle-air.service';
import { CreateBicycleAirDto } from './dto/create-bicycle-air.dto';
import { UpdateBicycleAirDto } from './dto/update-bicycle-air.dto';

@Controller('bicycle-air')
export class BicycleAirController {
  constructor(private readonly bicycleAirService: BicycleAirService) {}

  @Post()
  create(@Body() createBicycleAirDto: CreateBicycleAirDto) {
    return this.bicycleAirService.create(createBicycleAirDto);
  }

  @Get()
  findAll() {
    return this.bicycleAirService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bicycleAirService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBicycleAirDto: UpdateBicycleAirDto) {
    return this.bicycleAirService.update(+id, updateBicycleAirDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bicycleAirService.remove(+id);
  }
}
