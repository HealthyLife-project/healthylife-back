import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  // 채팅을 생성하는 메서드
  create(username: string, message: string) {
    // 채팅 생성 로직
    return `New chat created by ${username} with message: ${message}`;
  }

  // 모든 채팅을 반환하는 메서드
  findAll() {
    // 모든 채팅을 가져오는 로직
    return `This action returns all chat`;
  }

  // 특정 채팅을 반환하는 메서드
  findOne(id: number) {
    // 특정 채팅을 가져오는 로직
    return `This action returns chat #${id}`;
  }

  // 채팅을 업데이트하는 메서드
  update(id: number, username: string, message: string) {
    // 채팅 업데이트 로직
    return `This action updates chat #${id} with new message: ${message} by ${username}`;
  }

  // 채팅을 삭제하는 메서드
  remove(id: number) {
    // 채팅 삭제 로직
    return `This action removes chat #${id}`;
  }
}
