import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'; // JWT 발급을 위한 서비스 import

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService, // JwtService 의존성 주입
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
    const user = {
      provider: 'google',
      providerId: id,
      name: displayName,
      email: emails[0].value,
      accessToken,
    };

    // 구글 로그인 성공 후 JWT 토큰 생성
    const payload = { sub: user.providerId, username: user.name }; // JWT payload
    const jwt = this.jwtService.sign(payload); // JWT 토큰 발급

    // JWT 토큰을 반환
    done(null, { user, jwt });
  }
}
