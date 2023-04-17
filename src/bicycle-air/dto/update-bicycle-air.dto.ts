import { PartialType } from '@nestjs/swagger';
import { CreateBicycleAirDto } from './create-bicycle-air.dto';

export class UpdateBicycleAirDto extends PartialType(CreateBicycleAirDto) {}
