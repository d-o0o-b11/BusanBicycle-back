import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBicycleAirDto } from './dto/create-bicycle-air.dto';
import { BicycleAirService } from './bicycle-air.service';

@Controller('bicycle-air')
export class BicycleAirController {
  constructor(private readonly bicycleAirService: BicycleAirService) {}

  /**
   *
   * @param dto 공기 주입소 데이터 저장
   * @returns
   */
  @Post()
  async bicycleAirStation(@Body() dto: CreateBicycleAirDto[]) {
    return await this.bicycleAirService.saveAirStation(dto);
  }

  /**
   * 공기 주입소 검색
   * @param local 공기 주입소 위치
   * @returns
   */
  @Get(':local')
  async findAirStation(@Param('local') local: string) {
    return await this.bicycleAirService.findAirStation(local);
  }
}
