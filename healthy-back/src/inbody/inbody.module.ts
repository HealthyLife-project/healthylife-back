import { Module } from '@nestjs/common';
import { InbodyService } from './inbody.service';
import { InbodyController } from './inbody.controller';
import { InBody } from 'src/database/entities/inbody.entity';
import { InBodyData } from 'src/database/entities/inbodyData.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([InBody, InBodyData])],
  controllers: [InbodyController],
  providers: [InbodyService],
})
export class InbodyModule {}
