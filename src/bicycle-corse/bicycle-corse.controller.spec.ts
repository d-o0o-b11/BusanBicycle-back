import { Test, TestingModule } from '@nestjs/testing';
import { BicycleCorseController } from './bicycle-corse.controller';
import { BicycleCorseService } from './bicycle-corse.service';

describe('BicycleCorseController', () => {
  let controller: BicycleCorseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BicycleCorseController],
      providers: [BicycleCorseService],
    }).compile();

    controller = module.get<BicycleCorseController>(BicycleCorseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
