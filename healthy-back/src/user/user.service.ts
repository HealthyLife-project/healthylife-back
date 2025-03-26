import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  // 사용자 생성
  create(username: string, email: string) {
    return `New user created with username: ${username} and email: ${email}`;
  }

  // 모든 사용자 조회
  findAll() {
    return `This action returns all users`;
  }

  // 특정 사용자 조회
  findOne(id: number) {
    return `This action returns user #${id}`;
  }

  // 사용자 업데이트
  update(id: number, username: string, email: string) {
    return `This action updates user #${id} with username: ${username} and email: ${email}`;
  }

  // 사용자 삭제
  remove(id: number) {
    return `This action removes user #${id}`;
  }
}
