import { PartialType } from '@nestjs/swagger';
import { CreateLogDto } from './create-log.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLogDto extends PartialType(CreateLogDto) {
  @ApiProperty({
    description: 'id',
    type: Number,
  })
  id: Number;

  @ApiProperty({
    description: 'ip주소',
    type: String,
  })
  ipAddress: String;

  @ApiProperty({
    description: '요청 url',
    type: String,
  })
  url: String;
}
