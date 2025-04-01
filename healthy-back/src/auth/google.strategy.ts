import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'; // JWT 발급을 위한 서비스 import
import { AuthService } from './auth.service'; // AuthService 추가

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService, // JwtService 의존성 주입
    private readonly userService: AuthService, // AuthService 의존성 주입
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_KEY'),
      clientSecret: configService.get<string>('GOOGLE_SECRET_KEY'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK'),
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

    if (!user) {
      // 사용자가 없으면 회원가입 유도 (result: true, signup: false)
      done(null, { userid: email, signup: false });
    } else {
      // 이미 회원이면 JWT 발급
      const payload = { sub: user.id, userid: user.userid }; // JWT payload
      const jwt = this.jwtService.sign(payload); // JWT 토큰 발급
      done(null, { userid: email, jwt, signup: true });
    }
  }
}
