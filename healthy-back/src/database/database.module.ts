import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // 환경 변수 사용
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
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
      }),
    }),
  ],
})
export class DatabaseModule {}
