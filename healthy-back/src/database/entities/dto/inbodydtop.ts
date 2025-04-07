// src/inbody/dto/create-inbody.dto.ts

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInbodyDto {
  @ApiProperty({ example: '70.5', description: '몸무게 (kg)' })
  @IsString()
  weight: string;

  @ApiProperty({ example: '30.2', description: '골격근량 (kg)' })
  @IsString()
  muscleMass: string;

  @ApiProperty({ example: '20.1', description: '체지방량 (kg)' })
  @IsString()
  bodyFat: string;

  @ApiProperty({ example: '22.8', description: 'BMI (체질량지수)' })
  @IsString()
  bmi: string;

  @ApiProperty({ example: '175.0', description: '키 (cm)' })
  @IsString()
  height: string;

  @ApiProperty({ example: '18.5', description: '체지방률 (%)' })
  @IsString()
  bodyFatPer: string;
}
