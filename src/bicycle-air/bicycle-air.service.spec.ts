import { Test, TestingModule } from '@nestjs/testing';
import { BicycleAirService } from './bicycle-air.service';
import { Like, Repository } from 'typeorm';
import { BicycleAirEntity } from './entities/bicycle-air.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from 'src/mock.repository';
import { Mapper, createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AirProfile } from './mapper/bicycle-air.mapper';
import { CreateBicycleAirDto } from './dto/create-bicycle-air.dto';

describe('BicycleAirService', () => {
  let service: BicycleAirService;
  let bicycleAirRepository: Repository<BicycleAirEntity>;
  let mapper: Mapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BicycleAirService,
        {
          provide: getRepositoryToken(BicycleAirEntity),
          useValue: mockRepository(),
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
        AirProfile,
      ],
    }).compile();

    service = module.get<BicycleAirService>(BicycleAirService);
    bicycleAirRepository = module.get<Repository<BicycleAirEntity>>(
      getRepositoryToken(BicycleAirEntity),
    );
    mapper = module.get(getMapperToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(bicycleAirRepository).toBeDefined();
    expect(mapper).toBeDefined();
  });

  describe('saveAirStation', () => {
    const entityDummyData = [
      {
        gugun: '낙동강관리본부',
        pumpgubun: '수동식',
        pumpsetcost: '10000',
        spot: '삼락자전거대여소',
      },
    ];

    it('자전거 공기 주입소 데이터 저장', async () => {
      const entity = mapper.mapArray(
        entityDummyData,
        CreateBicycleAirDto,
        BicycleAirEntity,
      );

      const saveResult = jest.spyOn(bicycleAirRepository, 'save');

      await service.saveAirStation(entityDummyData);

      expect(saveResult).toBeCalledTimes(1);
      expect(saveResult).toBeCalledWith(entity);
    });
  });

  describe('findAirStation', () => {
    const findDummyData = [
      {
        id: 4,
        gugun: '부산광역시 해운대구',
        pumpgubun: '태양광',
        pumpsetcost: '1730000',
        spot: '지하철 장산역 5번 출구 주변',
      },
      {
        id: 5,
        gugun: '부산광역시 해운대구',
        pumpgubun: '태양광',
        pumpsetcost: '1730000',
        spot: '지하철 영산대역 2번 출구',
      },
    ];

    it('공기 주입소 검색 기능', async () => {
      const local = '해운대';

      const findResult = jest
        .spyOn(bicycleAirRepository, 'find')
        .mockResolvedValue(findDummyData);

      await service.findAirStation(local);

      expect(findResult).toBeCalledTimes(1);
      expect(findResult).toBeCalledWith({
        where: {
          gugun: Like(`%${local}%`),
        },
      });
    });
  });
});
