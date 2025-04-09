import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
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
  @ApiParam({ name: 'id', type: Number, description: '채팅방 ID' })
  @ApiResponse({
    status: 200,
    description: '해당 반려동물 채팅방 반환',
    type: PetChatRoom,
  })
  async titlePet(@Param('id') num: number) {
    return await this.chatService.findPetRoom(num);
  }

  @Get('person/:id')
  @ApiOperation({ summary: '특정 사용자 채팅방 조회' })
  @ApiParam({ name: 'id', type: Number, description: '채팅방 ID' })
  @ApiResponse({
    status: 200,
    description: '해당 사용자 채팅방 반환',
    type: PersonChatRoom,
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
  @ApiOperation({ summary: '사람 채팅방 삭제' })
  @ApiParam({ name: 'id', description: '삭제할 채팅방 ID' })
  async deletePersonRoom(@Param('id') id: number) {
    return await this.chatService.deletePersonRoom(id);
  }

  @Delete('pet/delete/:id')
  @ApiOperation({ summary: '반려동물 채팅방 삭제' })
  @ApiParam({ name: 'id', description: '삭제할 채팅방 ID' })
  async deletePetRoom(@Param('id') id: number) {
    return await this.chatService.deletePetRoom(id);
  }

  @Post('pet/insert')
  @ApiOperation({ summary: '반려동물 채팅방 입장 처리' })
  @ApiBody({ description: '입장할 유저 정보 요청시 Body', type: InsertRoomDto })
  async insertPersonRoom(@Body() obj: any) {
    return await this.chatService.insertPetRoom(obj);
  }

  @Post('person/insert')
  @ApiOperation({ summary: '사람 채팅방 입장 처리' })
  @ApiBody({ description: '입장할 유저 정보 요청시 Body', type: InsertRoomDto })
  async insertPetRoom(@Body() obj: any) {
    return await this.chatService.insertPetRoom(obj);
  }
}
