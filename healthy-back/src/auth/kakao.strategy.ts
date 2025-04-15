import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service'; // UserService 추가
import { UserService } from 'src/user/user.service';
interface User {
  id: number;
  username: string;
  email: string;
}
@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService, // UserService를 주입받아 사용
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('KAKAO_KEY'),
      clientSecret: configService.get<string>('KAKAO_SECRET_KEY'),
      callbackURL: configService.get<string>('KAKAO_CALLBACK'),
      scope: ['account_email'], // 이메일 정보 요청
    });
  }

  // validate 메서드에서 회원 확인 후 JWT 발급 또는 회원가입 유도
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, displayName, emails } = profile;
    console.log(profile);
    const email = profile._json.kakao_account.email; // 이메일 추출
    const userCreate = { userid: email, email: email, provider: 'kakao' };
    const user = await this.authService.findUser(email);

    if (!user) {
      const users = await this.userService.create(userCreate);
      const payload = { id: users.id, userid: users.userid }; // JWT payload
      const jwt = this.jwtService.sign(payload); // JWT 토큰 발급
      done(null, { userid: email, jwt, signup: false });
    } else if (!user.address && !user.gender) {
      const payload = { id: user.id, userid: user.userid }; // JWT payload
      const jwt = this.jwtService.sign(payload); // JWT 토큰 발급
      done(null, { userid: email, jwt, signup: false });
    } else if (user) {
      const payload = { id: user.id, userid: user.userid }; // JWT payload
      const jwt = this.jwtService.sign(payload); // JWT 토큰 발급
      done(null, { userid: email, jwt, signup: true });
    }
  }
}
