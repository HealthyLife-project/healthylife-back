import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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
    return this.chatService.findallPerson();
  }

  @Get('chatlist/pet')
  @ApiOperation({ summary: '전체 반려동물 채팅방 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 반려동물 채팅방 목록을 반환함',
    type: [PetChatRoom],
  })
  async findPet() {
    return this.chatService.findallPet();
  }

  @Post('search')
  @ApiOperation({ summary: '사용자 채팅방 검색' })
  @ApiBody({
    schema: { type: 'object', properties: { value: { type: 'string' } } },
  })
  @ApiResponse({ status: 200, description: '검색된 채팅방 목록 반환' })
  async paramsSearch(@Body('value') str: string) {
    return this.chatService.searchPerson(str);
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
    return this.chatService.findPetRoom(num);
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
    return this.chatService.findPersonRoom(num);
  }
}
