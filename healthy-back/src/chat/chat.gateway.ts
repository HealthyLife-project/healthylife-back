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

@WebSocketGateway({ cors: true }) // CORS 설정
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users = new Map<string, string>(); // socketId -> username 매핑

  // 클라이언트 연결 시 실행
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // 클라이언트 연결 해제 시 실행
  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users.delete(client.id);
    this.server.emit('userList', Array.from(this.users.values()));
  }

  // 메시지 수신 이벤트
  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { username: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Message from ${data.username}: ${data.message}`);
    this.server.emit('receiveMessage', data); // 모든 클라이언트에게 전송
  }

  // 사용자 연결 시 닉네임 등록
  @SubscribeMessage('registerUser')
  handleRegister(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.users.set(client.id, username);
    this.server.emit('userList', Array.from(this.users.values())); // 사용자 목록 갱신
  }
}
