import { Test, TestingModule } from '@nestjs/testing';
import { BicycleAirService } from './bicycle-air.service';

describe('BicycleAirService', () => {
  let service: BicycleAirService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BicycleAirService],
    }).compile();

    service = module.get<BicycleAirService>(BicycleAirService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
