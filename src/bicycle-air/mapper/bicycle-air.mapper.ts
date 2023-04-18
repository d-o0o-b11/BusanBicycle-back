import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { BicycleAirEntity } from '../entities/bicycle-air.entity';
import { CreateBicycleAirDto } from '../dto/create-bicycle-air.dto';

@Injectable()
export class AirProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateBicycleAirDto, BicycleAirEntity);
      //두개 위치가 바껴야한다,,dto, entity
    };
  }
}
