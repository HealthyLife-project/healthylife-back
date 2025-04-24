import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { ChatService } from './chat.service';
import { PetChatRoom } from 'src/database/entities/petchatRoom.entity';
import { PersonChatRoom } from 'src/database/entities/personchatRoom.entitiy';
import { InsertRoomDto } from 'src/database/entities/dto/chatdto';
import { GetPersonMessageDto } from 'src/database/entities/dto/chatdto';
import {
  GetMessageCntDto,
  findChat,
  ChatIndexDto,
} from 'src/database/entities/dto/chatdto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('chatlist/person')
  @ApiOperation({ summary: '전체 사용자 채팅방 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 사용자 채팅방 목록을 반환함',
    type: [PersonChatRoom],
  })
  async findPerson() {
    return await this.chatService.findallPerson();
  }

  @Get('chatlist/pet')
  @ApiOperation({ summary: '전체 반려동물 채팅방 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 반려동물 채팅방 목록을 반환함',
    type: [PetChatRoom],
  })
  async findPet() {
    return await this.chatService.findallPet();
  }

  @Post('search')
  @ApiOperation({ summary: '사용자 채팅방 검색' })
  @ApiBody({
    schema: { type: 'object', properties: { value: { type: 'string' } } },
  })
  @ApiResponse({ status: 200, description: '검색된 채팅방 목록 반환' })
  async paramsSearch(@Body('value') str: string) {
    return await this.chatService.searchPerson(str);
  }

  @Get('pet/:id')
  @ApiOperation({ summary: '특정 반려동물 채팅방 조회' })
  @ApiParam({ name: 'id', type: Number, description: '유저 ID' })
  @ApiResponse({
    status: 200,
    description: '해당 반려동물 채팅방 반환',
    type: findChat,
  })
  async titlePet(@Param('id') num: number) {
    return await this.chatService.findPetRoom(num);
  }

  @Get('person/:id')
  @ApiOperation({ summary: '특정 사용자 채팅방 조회' })
  @ApiParam({ name: 'id', type: Number, description: '유저 ID' })
  @ApiResponse({
    status: 200,
    description: '해당 사용자 채팅방 반환',
    type: findChat,
  })
  async titlePerson(@Param('id') num: number) {
    return await this.chatService.findPersonRoom(num);
  }

  @Post('pet/create')
  @ApiOperation({ summary: '반려동물 채팅방 생성' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: '멍멍이' },
      },
    },
  })
  async petRoomCreate(@Body() obj: any) {
    return await this.chatService.createPetRoom(obj);
  }

  @Post('person/create')
  @ApiOperation({ summary: '일반 채팅방 생성' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: 'title' },
      },
    },
  })
  async personRoomCreate(@Body() obj: any) {
    return await this.chatService.createPersonRoom(obj);
  }

  @Post('person/saveMessage')
  @ApiOperation({ summary: '사람 채팅 메시지 저장' })
  @ApiBody({ description: '저장할 메시지 배열', type: [Object] })
  async savePersonMessage(@Body() arr: any) {
    return await this.chatService.createPersonMessage(arr);
  }

  @Post('pet/saveMessage')
  @ApiOperation({ summary: '반려동물 채팅 메시지 저장' })
  @ApiBody({ description: '저장할 메시지 배열', type: [Object] })
  async savePetMessage(@Body() arr: any) {
    return await this.chatService.createPetMessage(arr);
  }

  @Delete('person/delete/:id')
  @ApiOperation({ summary: '사람 채팅방 나가기' })
  @ApiParam({ name: 'id', description: '삭제할 채팅방 ID' })
  async deletePersonRoom(
    @Param('id') userid: number,
    @Query('roomid') roomid: number,
  ) {
    return await this.chatService.deletePersonRoom(userid, roomid);
  }

  @Delete('pet/delete/:id')
  @ApiOperation({ summary: '반려동물 채팅방 나가기' })
  @ApiParam({ name: 'id', description: '삭제할 채팅방 ID' })
  async deletePetRoom(
    @Param('id') userid: number,
    @Query('roomid') roomid: number,
  ) {
    return await this.chatService.deletePetRoom(userid, roomid);
  }

  @Post('person/insert')
  @ApiOperation({ summary: '사람 채팅방 입장 처리' })
  @ApiBody({ description: '입장할 유저 정보 요청시 Body', type: InsertRoomDto })
  async insertPersonRoom(@Body() obj: any) {
    return await this.chatService.insertPersonRoom(obj);
  }

  @Post('pet/insert')
  @ApiOperation({ summary: '반려동물 채팅방 입장 처리' })
  @ApiBody({ description: '입장할 유저 정보 요청시 Body', type: InsertRoomDto })
  async insertPetRoom(@Body() obj: any) {
    return await this.chatService.insertPetRoom(obj);
  }

  @Post('person/getMessage')
  @ApiOperation({ summary: '사람 채팅방 메시지 조회' })
  @ApiBody({ type: GetPersonMessageDto })
  @ApiResponse({
    status: 200,
    description: '메세지 목록 반환 [{},{}...]',
    type: [ChatIndexDto],
  })
  async getPersonMessage(
    @Body()
    body: {
      roomid: number;
      userid: number;
      page: number;
      limit: number;
    },
  ) {
    const { roomid, userid, page, limit } = body;

    return await this.chatService.getPersonMessages(
      roomid,
      userid,
      page,
      limit,
    );
  }

  @Post('pet/getMessage')
  @ApiOperation({ summary: '사람 채팅방 메시지 조회' })
  @ApiBody({ type: GetPersonMessageDto })
  @ApiResponse({
    status: 200,
    description: '메세지 목록 반환 [{},{}...]',
    type: [ChatIndexDto],
  })
  async getPetMessage(
    @Body()
    body: {
      roomid: number;
      userid: number;
      page: number;
      limit: number;
    },
  ) {
    const { roomid, userid, page, limit } = body;

    return await this.chatService.getPetMessages(roomid, userid, page, limit);
  }

  @Post('person/write')
  @ApiOperation({ summary: '사람 안읽은 메세지 카운트' })
  @ApiBody({ type: GetMessageCntDto, isArray: true })
  @ApiResponse({
    status: 200,
    description: '메시지 카운트 결과 배열로 반환 [1,2,3...]',
    type: [Number],
  })
  async getPersonMessageCnt(@Body() arr: any) {
    return this.chatService.getPersonMessageCnt(arr);
  }
  @Post('pet/write')
  @ApiOperation({ summary: '반려동물 안읽은 메세지 카운트' })
  @ApiBody({ type: GetMessageCntDto, isArray: true })
  @ApiResponse({
    status: 200,
    description: '메시지 카운트 결과 배열로 반환 [1,2,3...]',
    type: [Number],
  })
  async getPetMessageCnt(@Body() arr: any) {
    return this.chatService.getPetMessageCnt(arr);
  }

  @Post('pet/validate')
  @ApiOperation({ summary: '반려동물 채팅방 유효성 검사' })
  @ApiBody({
    description: '유저 정보와 룸 ID를 포함한 요청',
    schema: {
      type: 'object',
      properties: {
        userid: { type: 'number', example: 1 },
        roomid: { type: 'number', example: 123 },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '유효성 검사 결과 반환',
    type: Boolean,
  })
  async validatePetRoom(@Body() obj: any) {
    return this.chatService.validatePetRoom(obj);
  }

  @Post('person/validate')
  @ApiOperation({ summary: '일반 채팅방 유효성 검사' })
  @ApiBody({
    description: '유저 정보와 룸 ID를 포함한 요청',
    schema: {
      type: 'object',
      properties: {
        userid: { type: 'number', example: 1 },
        roomid: { type: 'number', example: 456 },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '유효성 검사 결과 반환',
    type: Boolean,
  })
  async validatePersonRoom(@Body() obj: any) {
    return this.chatService.validatePersonRoom(obj);
  }
}
