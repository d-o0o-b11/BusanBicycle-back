import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BicycleCorseService } from './bicycle-corse.service';
import { CreateBicycleCorseDto } from './dto/create-bicycle-corse.dto';
import { UpdateBicycleCorseDto } from './dto/update-bicycle-corse.dto';

@Controller('bicycle-corse')
export class BicycleCorseController {
  constructor(private readonly bicycleCorseService: BicycleCorseService) {}

  @Post()
  create(@Body() createBicycleCorseDto: CreateBicycleCorseDto) {
    return this.bicycleCorseService.create(createBicycleCorseDto);
  }

  @Get()
  findAll() {
    return this.bicycleCorseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bicycleCorseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBicycleCorseDto: UpdateBicycleCorseDto) {
    return this.bicycleCorseService.update(+id, updateBicycleCorseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bicycleCorseService.remove(+id);
  }
}
