import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service'; // UserService 추가
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
    private readonly userService: AuthService, // UserService를 주입받아 사용
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
    const { id, displayName, _json } = profile;
    const email = _json.kakao_account.email;

    // 사용자 정보 처리 (이메일로 사용자 검색)
    const user = await this.userService.findUser(email);

    if (!user) {
      // 사용자가 없으면 회원가입 유도
      done(null, { userid: email, signup: false });
    } else {
      // 이미 회원이면 JWT 발급
      const payload = { sub: user.id, userid: user.userid };
      const jwt = this.jwtService.sign(payload);
      done(null, { userid: email, jwt, signup: true });
    }
  }
}
