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
        to: `${user.email}`,
        from: 'noreply@gmail.com',
        subject: 'HEALTHYLIFE Password Update',
        text: '이메일 인증이 완료되었습니다.',
        html: `
        <p>이메일 인증이 완료되었습니다.</p>
        <p>아래 링크를 클릭하여 비밀번호를 재설정하세요:</p>
        <a href="http://localhost:3000/forgot-password/reset-password?id=${user.id}">Reset your Healthy Life password</a>
      `,
      });
    }
    return user ? user : null;
  }

  async updateUser(
    id: number,
    body: any,
  ): Promise<{ result: boolean; message: string }> {
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

  async premiumUser(id: number): Promise<{ result: boolean; message: string }> {
    await this.userRepository.update(id, { premium: true });

    return { result: true, message: '구독 완료되었습니다.' };
  }

  async premiumCancelUser(
    id: number,
  ): Promise<{ result: boolean; message: string }> {
    await this.userRepository.update(id, { premium: false });

    return { result: true, message: '구독 취소되었습니다.' };
  }

  async userOut(id: number): Promise<{ result: boolean; message: string }> {
    await this.userRepository.delete(id);

    return { result: true, message: '회원 탈퇴 성공' };
  }

  async findUserID(
    phone: string,
  ): Promise<
    { result: boolean; userid: string } | { result: boolean; message: string }
  > {
    const user = await this.userRepository.findOne({ where: { phone: phone } });

    return user
      ? { result: true, userid: user.userid }
      : { result: false, message: '존재하지 않는 사용자입니다.' };
  }
}
