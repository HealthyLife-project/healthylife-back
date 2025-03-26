import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets'; // 필요한 웹소켓 관련 데코레이터와 타입을 임포트
import { ChatService } from './chat.service'; // ChatService를 임포트하여 로직을 처리

@WebSocketGateway() // WebSocketGateway 데코레이터는 이 클래스가 웹소켓 서버 역할을 함을 정의
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {} // ChatService를 의존성 주입하여 사용

  // 'createChat' 이벤트 처리
  @SubscribeMessage('createChat') // 'createChat'이라는 이름의 이벤트를 구독
  create(@MessageBody() body: { username: string; message: string }) {
    // 이벤트에서 전달받은 메시지 바디를 처리
    return this.chatService.create(body.username, body.message); // ChatService의 create 메소드를 호출, 인수로 받은 username과 message 전달
  }

  // 'findAllChat' 이벤트 처리
  @SubscribeMessage('findAllChat') // 'findAllChat'이라는 이름의 이벤트를 구독
  findAll() {
    return this.chatService.findAll(); // 모든 채팅을 찾는 서비스 메소드 호출
  }

  // 'findOneChat' 이벤트 처리
  @SubscribeMessage('findOneChat') // 'findOneChat'이라는 이름의 이벤트를 구독
  findOne(@MessageBody() id: number) {
    // 요청 본문에서 id를 받아옴
    return this.chatService.findOne(id); // 받은 id를 기반으로 하나의 채팅을 찾는 서비스 메소드 호출
  }

  // 'updateChat' 이벤트 처리
  @SubscribeMessage('updateChat') // 'updateChat'이라는 이름의 이벤트를 구독
  update(
    @MessageBody() body: { id: number; username: string; message: string },
  ) {
    // id, username, message를 요청 본문에서 받아옴
    return this.chatService.update(body.id, body.username, body.message); // 받은 정보를 기반으로 채팅을 업데이트하는 서비스 메소드 호출
  }

  // 'removeChat' 이벤트 처리
  @SubscribeMessage('removeChat') // 'removeChat'이라는 이름의 이벤트를 구독
  remove(@MessageBody() id: number) {
    // 요청 본문에서 id를 받아옴
    return this.chatService.remove(id); // 받은 id를 기반으로 채팅을 삭제하는 서비스 메소드 호출
  }
}
