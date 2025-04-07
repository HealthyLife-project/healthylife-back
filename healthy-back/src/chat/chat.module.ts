import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';

import { PersonChat } from 'src/database/entities/personchat.entity';
import { PersonChatIndex } from 'src/database/entities/personchatindex.entity';
import { PersonChatRoom } from 'src/database/entities/personchatRoom.entitiy';
import { PetChat } from 'src/database/entities/petchat.entity';
import { PetChatIndex } from 'src/database/entities/petchatindex.entity';
import { PetChatRoom } from 'src/database/entities/petchatRoom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonChat,
      PersonChatIndex,
      PersonChatRoom,
      PetChat,
      PetChatIndex,
      PetChatRoom,
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
  exports: [ChatService], // 필요하면 export
})
export class ChatModule {}
