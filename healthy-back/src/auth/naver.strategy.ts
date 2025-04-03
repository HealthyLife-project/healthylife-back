import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-naver';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service'; // AuthService 추가

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService, // JwtService 의존성 주입
    private readonly userService: AuthService, // AuthService 의존성 주입
  ) {
    super({
      clientID: configService.get<string>('NAVER_KEY'),
      clientSecret: configService.get<string>('NAVER_SECRET_KEY'),
      callbackURL: configService.get<string>('NAVER_CALLBACK'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, displayName, emails } = profile;
    const email = emails[0].value; // 이메일 추출

    // 사용자 정보 처리 (이메일로 사용자 검색)
    const user = await this.userService.findUser(email);
    const pay = { email };
    const jwtoken = this.jwtService.sign(pay);
    if (!user) {
      // 사용자가 없으면 회원가입 유도 (result: true, signup: false)
      done(null, { userid: email, signup: false, jwtoken });
    } else {
      // 이미 회원이면 JWT 발급
      const payload = { id: user.id, userid: user.userid }; // JWT payload
      const jwt = this.jwtService.sign(payload); // JWT 토큰 발급
      done(null, { userid: email, jwt, signup: true });
    }
  }
}
