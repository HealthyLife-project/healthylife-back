import { ApiProperty } from '@nestjs/swagger';

export class CreateAdDto {
  @ApiProperty({
    example: '/uploads/ads/ad-1712345678912-123456789.jpg',
    description: '광고 이미지 경로',
    required: false,
  })
  imgsrc?: string;

  @ApiProperty({
    example: '광고 배너 제공자',
    description: '광고 제공자 정보',
    required: false,
  })
  imgsrcAder?: string;
}
