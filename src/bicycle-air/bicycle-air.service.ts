import { Injectable } from '@nestjs/common';
import { CreateBicycleAirDto } from './dto/create-bicycle-air.dto';
import { UpdateBicycleAirDto } from './dto/update-bicycle-air.dto';

@Injectable()
export class BicycleAirService {
  create(createBicycleAirDto: CreateBicycleAirDto) {
    return 'This action adds a new bicycleAir';
  }

  findAll() {
    return `This action returns all bicycleAir`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bicycleAir`;
  }

  update(id: number, updateBicycleAirDto: UpdateBicycleAirDto) {
    return `This action updates a #${id} bicycleAir`;
  }

  remove(id: number) {
    return `This action removes a #${id} bicycleAir`;
  }
}
