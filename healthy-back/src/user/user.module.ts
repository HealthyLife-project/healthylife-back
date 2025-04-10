import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../database/entities/user.entity';
import { UserHashtag } from '../database/entities/hashtag.entity';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserHashtag]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: configService.get('NODEMAILER_KEY'),
            pass: configService.get('NODEMAILER_PASSWORD_KEY'),
          },
        },
        defaults: {
          from: '"헬씨라이프" <no-reply@healthylife.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ], // User 엔터티 등록
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule], // 다른 모듈에서 사용할 수 있도록 export
})
export class UserModule {}
