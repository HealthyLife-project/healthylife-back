import { ApiProperty } from '@nestjs/swagger';

export class InsertRoomDto {
  @ApiProperty({ description: '채팅방 ID', example: 1 })
  roomid: number;

  @ApiProperty({ description: '유저 ID', example: 4 })
  userid: number;
}

export class GetPersonMessageDto {
  @ApiProperty({ description: '채팅방 ID', example: 1 })
  roomid: number;

  @ApiProperty({ description: '유저 ID', example: 4 })
  userid: number;

  @ApiProperty({ description: '페이지 번호', example: 1 })
  page: number;

  @ApiProperty({ description: '가져올 메시지 개수', example: 10 })
  limit: number;
}

export class GetMessageCntDto {
  @ApiProperty({ description: '유저 ID', example: 1 })
  userid: number;

  @ApiProperty({ description: '채팅방 ID', example: 1 })
  roomid: number;
}

export class ChatIndexDto {
  @ApiProperty({
    description: '채팅 메시지 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '사용자 ID',
    example: 4,
  })
  userid: number;

  @ApiProperty({
    description: '채팅방 ID',
    example: 101,
  })
  roomid: number;

  @ApiProperty({
    description: '메시지 내용',
    example: '안녕하세요!',
  })
  text: string;

  @ApiProperty({
    description: '사용자 닉네임',
    example: '홍길동',
  })
  userNickname: string;

  @ApiProperty({
    description: '메시지 전송 시간',
    example: '2025-04-1512:00:00',
  })
  time: string;
}
