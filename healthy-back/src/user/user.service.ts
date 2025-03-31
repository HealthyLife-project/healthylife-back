import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { UserHashtag } from '../database/entities/hashtag.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, // UserRepository 의존성 주입
    @InjectRepository(UserHashtag)
    private readonly hashRepository: Repository<UserHashtag>,
  ) {}

  async create(userData: Partial<User>) {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUser(
    userid: string,
  ): Promise<{ result: boolean; message: string }> {
    const res = await this.userRepository.findOne({ where: { userid } });

    return res
      ? { result: false, message: '중복 아이디입니다.' }
      : { result: true, message: '사용 가능한 아이디입니다.' };
  }

  async findNickname(
    nickname: string,
  ): Promise<{ result: boolean; message: string }> {
    const res = await this.userRepository.findOne({ where: { nickname } });

    return res
      ? { result: false, message: '중복 닉네임입니다.' }
      : { result: true, message: '사용 가능한 닉네임입니다.' };
  }
}
