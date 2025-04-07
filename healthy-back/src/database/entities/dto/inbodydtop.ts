// src/inbody/dto/create-inbody.dto.ts

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInbodyDto {
  @ApiProperty({ example: '70.5', description: '몸무게 (kg)', type: String })
  @IsString()
  weight: string;

  @ApiProperty({ example: '30.2', description: '골격근량 (kg)', type: String })
  @IsString()
  muscleMass: string;

  @ApiProperty({ example: '20.1', description: '체지방량 (kg)', type: String })
  @IsString()
  bodyFat: string;

  @ApiProperty({
    example: '22.8',
    description: 'BMI (체질량지수)',
    type: String,
  })
  @IsString()
  bmi: string;

  @ApiProperty({ example: '175.0', description: '키 (cm)', type: String })
  @IsString()
  height: string;

  @ApiProperty({ example: '18.5', description: '체지방률 (%)', type: String })
  @IsString()
  bodyFatPer: string;
}
