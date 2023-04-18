import { Injectable } from '@nestjs/common';
import { CreateBicycleAirDto } from './dto/create-bicycle-air.dto';
import { InjectMapper } from '@automapper/nestjs';
import { BicycleAirEntity } from './entities/bicycle-air.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';

@Injectable()
export class BicycleAirService {
  constructor(
    @InjectRepository(BicycleAirEntity)
    private readonly bicycleAirRepository: Repository<BicycleAirEntity>,

    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async saveAirStaion(dto: CreateBicycleAirDto[]) {
    const entity = this.mapper.mapArray(
      dto,
      CreateBicycleAirDto,
      BicycleAirEntity,
    );

    const saveResult = await this.bicycleAirRepository.save(entity);

    return saveResult;
  }
}
