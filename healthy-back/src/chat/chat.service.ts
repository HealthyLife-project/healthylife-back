import { Injectable } from '@nestjs/common'; // Injectable 데코레이터를 사용하여 이 클래스가 서비스로 사용될 수 있도록 정의

@Injectable()
export class ChatService {
  // 새로운 채팅을 생성하는 메소드
  create(username: string, message: string) {
    return `Chat created with username: ${username} and message: ${message}`; // 채팅을 생성했음을 나타내는 메시지 반환
  }

  // 모든 채팅을 반환하는 메소드
  findAll() {
    return 'This action returns all chats'; // 모든 채팅을 반환하는 메시지 반환
  }

  // 특정 id를 가진 채팅을 반환하는 메소드
  findOne(id: number) {
    return `This action returns a chat with id: ${id}`; // 특정 id를 가진 채팅을 반환하는 메시지 반환
  }

  // 특정 채팅을 업데이트하는 메소드
  update(id: number, username: string, message: string) {
    return `Chat with id ${id} updated with username: ${username} and message: ${message}`; // 업데이트된 채팅 메시지 반환
  }

  // 특정 채팅을 삭제하는 메소드
  remove(id: number) {
    return `Chat with id ${id} removed`; // 삭제된 채팅을 나타내는 메시지 반환
  }
}
