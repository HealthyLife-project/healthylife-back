import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './entities/user.entity';
import { UserHashtag } from './entities/hashtag.entity';
import { Hashtag } from './entities/hash.entity';
import { InBody } from './entities/inbody.entity';
import { InBodyData } from './entities/inbodyData.entity';
import { Category } from './entities/category.entity';
import { IpMiddle } from '../admin/middle/logging.ip.middle'; // 미들웨어 경로 확인
import { IpLog } from './entities/iplog.entitiy';
import { Report } from './entities/report.entity';
import { Adb } from 'src/database/entities/ad.entity';

import { RedisModule } from '@nestjs-modules/ioredis';
import { HashModule } from '../hash/hash.module';
import { UserModule } from '../user/user.module';
import { ChatModule } from '../chat/chat.module';
import { LogModule } from '../admin/log/log.module';
import { AuthModule } from '../auth/auth.module';
import { AiModule } from '../ai/ai.module';
import { PayModule } from '../pay/pay.module';
import { AdModule } from '../admin/ad/ad.module';
import { InbodyModule } from '../inbody/inbody.module';
import { MapsModule } from '../maps/maps.module';
import { AdminModule } from '../admin/admin.module';
import { ReportModule } from '../report/report.module';
import { NewsModule } from '../news/news.module';
@Module({
  imports: [
    ConfigModule.forRoot(), // 환경 변수 사용

    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        AdminModule,
        UserModule,
        ChatModule,
        HashModule,
        LogModule,
        AuthModule,
        AiModule,
        PayModule,
        AdModule,
        InbodyModule,
        MapsModule,
        ReportModule,
        NewsModule,
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
          InBodyData,
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
