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
      title: string;
      roomid: number;
      userid: number;
      boolean: boolean;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const { userNickname, category, roomid, userid, boolean, title } = data;
    const room = `${roomid}-${category}`;
    client.join(room);
    this.users.set(client.id, { userNickname, room });

    // 해당 방 유저 목록 전송
    const roomUsers = this.getUsersInRoom(room);
    this.server.to(room).emit('userList', roomUsers);
    console.log('category', category);
    if (category == 'person') {
      console.log('person on', userid, roomid);
      const obj = { roomid, userid };
      const obj2 = { title, userid };
      const roomVali = await this.chatService.validatePersonRoomCreate(roomid);
      if (!roomVali) {
        await this.chatService.createPersonRoom(obj2);
      }
      await this.chatService.insertPersonRoom(obj);

      const messagesData = await this.chatService.getPersonMessages(
        roomid,
        userid,
        1,
        10,
      );
      const messages = messagesData?.page;
      const today = new Date();

      const formatDate = (date: Date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // 0~11이니까 +1
        const dd = String(date.getDate()).padStart(2, '0');

        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const sec = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}.${mm}.${dd} ${hh}:${min}:${sec}`;
      };

      if (!boolean) {
        let arr = {
          userid: userid,
          userNickname: userNickname,
          time: formatDate(today),
          roomid: roomid,
          aopen: `${userNickname}님이 입장하셨습니다.`,
        };
        await this.chatService.createPersonMessage(arr);
      }
      !boolean
        ? this.server.to(room).emit('receiveMessage', {
            userNickname,
            message: '',
            aopen: `${userNickname}님이 입장하셨습니다.`,
            time: formatDate(today),
            userid: userid,
          })
        : messages?.map((item) => {
            this.server.to(room).emit('receiveMessage', {
              userNickname,
              message: item.text,
              aopen: item.aopen,
              time: formatDate(today),
              userid: userid,
            });
          });
    }
    if (category == 'pet') {
      console.log('pet on');
      const obj = { roomid, userid };
      const obj2 = { title, userid };
      const roomVali = await this.chatService.validatePetRoomCreate(roomid);
      if (!roomVali) {
        await this.chatService.createPetRoom(obj2);
      }
      await this.chatService.insertPetRoom(obj);
      const messagesData = await this.chatService.getPetMessages(
        roomid,
        userid,
        1,
        10,
      );
      const messages = messagesData?.page;
      const today = new Date();

      const formatDate = (date: Date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // 0~11이니까 +1
        const dd = String(date.getDate()).padStart(2, '0');

        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const sec = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}.${mm}.${dd} ${hh}:${min}:${sec}`;
      };

      if (!boolean) {
        let arr = {
          userid: userid,
          userNickname: userNickname,
          time: formatDate(today),
          roomid: roomid,
          aopen: `${userNickname}님이 입장하셨습니다.`,
        };
        await this.chatService.createPetMessage(arr);
      }
      !boolean
        ? this.server.to(room).emit('receiveMessage', {
            userNickname,
            message: '',
            aopen: `${userNickname}님이 입장하셨습니다.`,
            time: formatDate(today),
            userid: userid,
          })
        : messages?.map((item) => {
            this.server.to(room).emit('receiveMessage', {
              userNickname,
              message: item.text,
              aopen: item.aopen,
              time: formatDate(today),
              userid: userid,
            });
          });
    }

    console.log(`${userNickname} joined room: ${room}`);
  }

  // 메시지 전송
  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody()
    data: {
      roomid: string;
      userNickname: string;
      message: string;
      userid: number;
      time: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomid, userNickname, message, userid, time } = data;
    console.log(`Message from ${userNickname} in room ${roomid}: ${message}`);
    this.server.to(roomid).emit('receiveMessage', {
      userNickname,
      message,
      boolean: false,
      userid,
      time,
    });
  }

  // 방 안 유저 리스트 가져오기
  private getUsersInRoom(room: string): string[] {
    const usersInRoom: string[] = [];
    for (const [, value] of this.users) {
      if (value.room === room) {
        console.log(value, 'JOINROOMTEST');
        usersInRoom.push(value.userNickname);
      }
    }
    return usersInRoom;
  }
}
