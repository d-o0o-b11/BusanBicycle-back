import { PartialType } from '@nestjs/swagger';
import { CreateBicycleCorseDto } from './create-bicycle-corse.dto';

export class UpdateBicycleCorseDto extends PartialType(CreateBicycleCorseDto) {}
