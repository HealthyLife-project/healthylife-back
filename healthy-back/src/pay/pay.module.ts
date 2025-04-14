import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // 추가
import { User } from 'src/database/entities/user.entity'; // User 엔티티 import

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]), // User 엔티티 등록
  ],
  controllers: [PayController],
  providers: [PayService],
})
export class PayModule {}
