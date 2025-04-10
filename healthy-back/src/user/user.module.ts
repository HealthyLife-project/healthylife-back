import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../database/entities/user.entity';
import { UserHashtag } from '../database/entities/hashtag.entity';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserHashtag]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.NODEMAILER_KEY,
          pass: process.env.NODEMAILER_PASSWORD_KEY,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ], // User 엔터티 등록
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule], // 다른 모듈에서 사용할 수 있도록 export
})
export class UserModule {}
