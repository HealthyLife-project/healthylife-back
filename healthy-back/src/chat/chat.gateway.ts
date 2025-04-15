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

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
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
  handleJoinRoom(
    @MessageBody() data: { room: string; userNickname: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { room, userNickname } = data;
    client.join(room);
    this.users.set(client.id, { userNickname, room });

    // 해당 방 유저 목록 전송
    const roomUsers = this.getUsersInRoom(room);
    this.server.to(room).emit('userList', roomUsers);

    console.log(`${userNickname} joined room: ${room}`);
  }

  // 메시지 전송
  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody()
    data: { room: string; userNickname: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { room, userNickname, message } = data;
    console.log(`Message from ${userNickname} in room ${room}: ${message}`);
    this.server.to(room).emit('receiveMessage', { userNickname, message });
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
