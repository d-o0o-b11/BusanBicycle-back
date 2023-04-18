import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { CreateBicycleAirDto } from './dto/create-bicycle-air.dto';
import { BicycleAirService } from './bicycle-air.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('공기 주입소 api')
@Controller('bicycle-air')
export class BicycleAirController {
  constructor(private readonly bicycleAirService: BicycleAirService) {}

  @ApiOperation({
    summary: '공기 주입소 데이터 저장 ',
  })
  @ApiBody({
    type: () => [CreateBicycleAirDto],
    isArray: true,
  })
  @Post()
  async bicycleAirStation(
    @Body(new ParseArrayPipe({ whitelist: true, items: CreateBicycleAirDto }))
    dto: CreateBicycleAirDto[],
  ) {
    return await this.bicycleAirService.saveAirStation(dto);
  }

  @ApiOperation({
    summary: '공기 주입소 위치 검색',
  })
  @Get(':local')
  async findAirStation(@Param('local') local: string) {
    return await this.bicycleAirService.findAirStation(local);
  }
}
