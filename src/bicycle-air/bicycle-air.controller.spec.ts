import { Test, TestingModule } from '@nestjs/testing';
import { BicycleAirController } from './bicycle-air.controller';
import { BicycleAirService } from './bicycle-air.service';

describe('BicycleAirController', () => {
  let controller: BicycleAirController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BicycleAirController],
      providers: [BicycleAirService],
    }).compile();

    controller = module.get<BicycleAirController>(BicycleAirController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
