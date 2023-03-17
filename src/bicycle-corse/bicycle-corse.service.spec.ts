import { Test, TestingModule } from '@nestjs/testing';
import { BicycleCorseService } from './bicycle-corse.service';

describe('BicycleCorseService', () => {
  let service: BicycleCorseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BicycleCorseService],
    }).compile();

    service = module.get<BicycleCorseService>(BicycleCorseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
