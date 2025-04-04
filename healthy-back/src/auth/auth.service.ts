import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//typeorm 모듈에선 Entity를 불러올 때 객체형식으로 불러오고 InjectRepostiory라는 메서드를 이용해 Repository를 카피해옴
//카피 이후에 그 Repo를 이용해서 받아온 데이터와 비교 또는 확인하는듯

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>, // User Repository 주입
  ) {}

  // bcrypto 이용해서 비밀번호 해시화 하는 부분
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  // 비밀번호 검증 함수
  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // id를 이용해서 jwt token 생성
  async createJWTPASS(user: User): Promise<string> {
    const payload = { id: user.id, userid: user.userid };
    return this.jwtService.sign(payload);
  }
  // 비밀번호 검증 받은 뒤에 로그인 확인

  async validateToken(token: string) {
    try {
      // 1. 토큰 검증 및 해독
      const decoded = this.jwtService.verify(token);

      // 2. 해독된 정보에서 id로 user추출
      const user = await this.userRepository.findOne(decoded.userid);

      // 3. 유저가 존재하는지 확인
      if (!user) {
        throw new UnauthorizedException('존재하지 않는 유저');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 토큰'); //error코드 확인 꼭 해야함 나오면
    }
  }

  async login(userInput: { userid: string; password: string }) {
    console.log(userInput);
    // Repository를 사용해 데이터베이스에서 사용자 정보 조회
    const user = await this.userRepository.findOne({
      where: { userid: userInput.userid },
    });

    if (!user) {
      throw new HttpException(
        { result: false, message: '존재하지 않는 사용자입니다.' },
        HttpStatus.UNAUTHORIZED, // 오류 코드 401
      );
    }
    console.log(user, userInput.password, user.password);
    const validPass = await this.validatePassword(
      userInput.password,
      user.password,
    );
    if (!validPass) {
      throw new HttpException(
        { result: false, message: '비밀번호가 올바르지 않습니다.' },
        HttpStatus.UNAUTHORIZED, // 오류 코드 401
      );
    }

    const jwt = await this.createJWTPASS(user); // JWT 생성
    return {
      result: true, // 로그인 성공
      token: jwt, // 생성된 토큰 반환
    };
  }

  async findUser(userid: string): Promise<User | null> {
    const users = await this.userRepository.findOne({
      where: { userid: userid },
    });

    return users;
  }
}
