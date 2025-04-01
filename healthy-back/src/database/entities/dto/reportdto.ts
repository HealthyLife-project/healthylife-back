import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  @ApiProperty({
    description: 'id',
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: '신고내역',
    type: String,
  })
  report: string;
  @ApiProperty({
    description: '신고횟수',
    type: Number,
  })
  reportCnt: string;
  @ApiProperty({
    description: 'timestamp',
    type: String,
  })
  timestamp: string;
  @ApiProperty({
    description: '신고 당한 사람',
    type: String,
  })
  user: string;
  @ApiProperty({
    description: '신고 한 사람',
    type: String,
  })
  reporter: string;
}
