import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../database/entities/user.entity';
import { UserHashtag } from '../database/entities/hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserHashtag])], // User 엔터티 등록
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule], // 다른 모듈에서 사용할 수 있도록 export
})
export class UserModule {}
