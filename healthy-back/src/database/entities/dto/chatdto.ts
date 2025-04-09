import { ApiProperty } from '@nestjs/swagger';

export class InsertRoomDto {
  @ApiProperty({ description: '채팅방 ID', example: 1 })
  roomid: number;

  @ApiProperty({ description: '유저 ID', example: 4 })
  userid: number;
}
