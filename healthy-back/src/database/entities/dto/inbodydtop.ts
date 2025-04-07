import { ApiProperty } from '@nestjs/swagger';

export class CreateInbodyDto {
  @ApiProperty({ example: '70.5' })
  weight: string;

  @ApiProperty({ example: '30.2' })
  muscleMass: string;

  @ApiProperty({ example: '20.1' })
  bodyFat: string;

  @ApiProperty({ example: '22.8' })
  bmi: string;

  @ApiProperty({ example: '175.0' })
  height: string;

  @ApiProperty({ example: '18.5' })
  bodyFatPer: string;
}
