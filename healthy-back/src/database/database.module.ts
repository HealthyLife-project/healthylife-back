import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './entities/user.entity';
import { UserHashtag } from './entities/hashtag.entity';
import { Hashtag } from './entities/hash.entity';
import { InBody } from './entities/inbody.entity';
import { Category } from './entities/category.entity';
import { IpMiddle } from '../middle/logging.ip.middle'; // 미들웨어 경로 확인
import { IpLog } from './entities/iplog.entitiy';
import { Report } from './entities/report.entity';
import { Adb } from 'src/database/entities/ad.entity';

import { RedisModule } from '@nestjs-modules/ioredis';
import { HashModule } from 'src/hash/hash.module';
import { UserModule } from '../user/user.module';
import { ChatModule } from '../chat/chat.module';
import { LogModule } from 'src/log/log.module';
import { AuthModule } from 'src/auth/auth.module';
import { AiModule } from 'src/ai/ai.module';
import { PayModule } from 'src/pay/pay.module';
import { AdModule } from 'src/ad/ad.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // 환경 변수 사용

    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        UserModule,
        ChatModule,
        HashModule,
        LogModule,
        AuthModule,
        AiModule,
        PayModule,
        AdModule,
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASS', 'password'),
        database: configService.get('DB_NAME', 'healthy_db'),
        autoLoadEntities: true,
        synchronize: true, // 개발 환경에서만 true (배포 시에는 false)
        entities: [
          User,
          UserHashtag,
          InBody,
          Hashtag,
          Category,
          IpLog,
          Report,
          Adb,
        ],
      }),
    }),

    TypeOrmModule.forFeature([IpLog]),
  ],
})
export class DatabaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IpMiddle) // 미들웨어를 적용
      .forRoutes('*'); // 관리자 페이지에만 적용 (경로를 원하는 대로 설정 가능)
  }
}
