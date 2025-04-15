import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'; // JWT 발급을 위한 서비스 import
import { AuthService } from './auth.service'; // AuthService 추가
import { UserService } from 'src/user/user.service';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService, // JwtService 의존성 주입
    private readonly authService: AuthService, // AuthService 의존성 주입
    private readonly userService: UserService,
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
    const userCreate = { userid: email, email: email, provider: 'google' };
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
