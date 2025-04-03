import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PayController],
  providers: [PayService, ConfigService],
})
export class PayModule {}
