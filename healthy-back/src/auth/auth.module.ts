import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';
import { NaverStrategy } from './naver.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // User 엔티티를 TypeORM에 등록
    ConfigModule.forRoot(), // ConfigModule 추가 (기본적으로 .env 파일을 읽음)
    JwtModule.registerAsync({
      imports: [ConfigModule], // ConfigModule를 이용.
      inject: [ConfigService], // ConfigService 주입
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // env에서 JWT_SECRET 가져오기
        signOptions: { expiresIn: '2h' }, // 토큰 만료 시간 설정
      }),
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  providers: [AuthService, GoogleStrategy, NaverStrategy, KakaoStrategy], // AuthService를 providers에 등록
  controllers: [AuthController], // AuthController를 controllers에 등록
})
export class AuthModule {}
