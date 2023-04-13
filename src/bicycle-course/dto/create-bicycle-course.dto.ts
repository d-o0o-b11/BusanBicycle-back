import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBicycleCourseDto {
  @IsString()
  @ApiProperty({
    example: '구군명',
    description: '부산광역시 해운대구',
  })
  gugunnm: string;

  @IsString()
  @ApiProperty({
    example: '자전거 보행자겸용 구간길이',
    description: '2.56',
  })
  gugunWithWalk: string;

  @IsString()
  @ApiProperty({
    example: '시작 지점',
    description: '우동 1413-5',
  })
  startSpot: string;

  @IsString()
  @ApiProperty({
    example: '종료 지점',
    description: '우동 1544',
  })
  endSpot: string;

  @IsString()
  @ApiProperty({
    example: '구간길이',
    description: '2.56',
  })
  total: string;
}
