import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super({
      clientID: configService.get<string>('KAKAO_KEY'),
      clientSecret: configService.get<string>('KAKAO_SECRET_KEY'),
      callbackURL: configService.get<string>('KAKAO_CALLBACK'),
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
      provider: 'kakao',
      providerId: id,
      name: displayName,
      email: emails[0].value,
      accessToken,
    };
    const payload = { sub: user.providerId, username: user.name }; // JWT payload
    const jwt = this.jwtService.sign(payload); // JWT 토큰 발급

    // JWT 토큰을 반환
    done(null, { user, jwt });
  }
}
