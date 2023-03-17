import { Injectable } from '@nestjs/common';
import { CreateBicycleCorseDto } from './dto/create-bicycle-corse.dto';
import { UpdateBicycleCorseDto } from './dto/update-bicycle-corse.dto';

@Injectable()
export class BicycleCorseService {
  create(createBicycleCorseDto: CreateBicycleCorseDto) {
    return 'This action adds a new bicycleCorse';
  }

  findAll() {
    return `This action returns all bicycleCorse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bicycleCorse`;
  }

  update(id: number, updateBicycleCorseDto: UpdateBicycleCorseDto) {
    return `This action updates a #${id} bicycleCorse`;
  }

  remove(id: number) {
    return `This action removes a #${id} bicycleCorse`;
  }
}
