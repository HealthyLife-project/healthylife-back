import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  // socket.id => { username, room }
  private users = new Map<string, { userNickname: string; room: string }>();

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const user = this.users.get(client.id);
    if (user) {
      const { room } = user;
      this.users.delete(client.id);

      // 해당 방 유저 목록 업데이트
      const roomUsers = this.getUsersInRoom(room);
      this.server.to(room).emit('userList', roomUsers);
      console.log(`Client disconnected: ${client.id} from room ${room}`);
    }
  }

  // 방 입장 및 유저 등록
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody()
    data: {
      room: string;
      userNickname: string;
      category: string;
      roomid: number;
      userid: number;
      boolean: boolean;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const { room, userNickname, category, roomid, userid, boolean } = data;
    console.log(data, 'datata');
    client.join(room);
    this.users.set(client.id, { userNickname, room });

    // 해당 방 유저 목록 전송
    const roomUsers = this.getUsersInRoom(room);
    this.server.to(room).emit('userList', roomUsers);

    if (category == 'person') {
      const obj = { roomid, userid };
      await this.chatService.insertPersonRoom(obj);

      const messages = await this.chatService.getPersonMessages(
        roomid,
        userid,
        1,
        10,
      );

      !boolean
        ? this.server.to(room).emit('receiveMessage', {
            userNickname,
            message: '',
            aopen: `${userNickname}님이 입장하셨습니다.`,
          })
        : messages.map((item) => {
            this.server.to(room).emit('receiveMessage', {
              userNickname,
              message: item.text,
            });
          });
    }
    if (category == 'pet') {
      const obj = { roomid, userid };
      await this.chatService.insertPetRoom(obj);
      const messages = await this.chatService.getPetMessages(
        roomid,
        userid,
        1,
        10,
      );
      !boolean
        ? messages.map((item) => {
            this.server.to(room).emit('receiveMessage', {
              userNickname,
              message: item.text,
            });
          })
        : this.server.to(room).emit('receiveMessage', {
            userNickname,
            message: '',
            aopen: `${userNickname}님이 입장하셨습니다.`,
          });
    }

    console.log(`${userNickname} joined room: ${room}`);
  }

  // 메시지 전송
  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody()
    data: {
      room: string;
      userNickname: string;
      message: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const { room, userNickname, message } = data;
    console.log(`Message from ${userNickname} in room ${room}: ${message}`);
    this.server
      .to(room)
      .emit('receiveMessage', { userNickname, message, boolean: false });
  }

  // 방 안 유저 리스트 가져오기
  private getUsersInRoom(room: string): string[] {
    const usersInRoom: string[] = [];
    for (const [, value] of this.users) {
      if (value.room === room) {
        usersInRoom.push(value.userNickname);
      }
    }
    return usersInRoom;
  }
}
