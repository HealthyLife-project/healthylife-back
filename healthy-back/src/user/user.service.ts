import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { UserHashtag } from '../database/entities/hashtag.entity';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from 'src/database/entities/dto/userdto';
import { UserDto } from 'src/database/entities/dto/userdto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, // UserRepository 의존성 주입
    @InjectRepository(UserHashtag)
    private readonly hashRepository: Repository<UserHashtag>,
    private readonly mailerService: MailerService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(userData: Partial<User>) {
    if (userData.password) {
      userData.password = await this.hashPassword(userData.password);
    }
    const newUser = this.userRepository.create({
      ...userData,
    });

    return await this.userRepository.save(newUser);
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

  async updatePassword(
    PassInput: UpdatePasswordDto,
  ): Promise<{ result: boolean; message: string }> {
    if (PassInput.password === PassInput.passwordCheck) {
      const pass = await this.hashPassword(PassInput.password);
      const user = await this.userRepository.findOne({
        where: { id: PassInput.userid },
      });

      if (!user) {
        throw new Error('존재하지 않는 유저입니다.');
      }
      user.password = pass;
      await this.userRepository.save(user);

      return {
        result: true,
        message: '비밀번호 변경이 성공적으로 완료되었습니다.',
      };
    } else {
      return { result: false, message: '비밀번호 변경 실패' };
    }
  }

  async findEmailUser(email: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      this.mailerService.sendMail({
        to: 'tkdgys1234@gmail.com',
        from: 'noreply@gmail.com',
        subject: '안녕?',
        text: '나는 비밀번호 변경해주는 사람이야',
        html: `<a href ="http://localhost:3000/forgot-password/reset-password/${user.id}">여기로 가</a>`,
      });
    }
    return user ? user : null;
  }

  async updateUser(
    id: number,
    body: any,
  ): Promise<{ result: boolean; message: string }> {
    console.log('body', body);
    const result = await this.userRepository.update(id, body);

    if (result.affected && result.affected > 0) {
      return { result: true, message: '개인 정보 변경 성공' };
    } else {
      return {
        result: false,
        message: '해당 유저가 존재하지 않거나 변경사항 없음',
      };
    }
  }
}
