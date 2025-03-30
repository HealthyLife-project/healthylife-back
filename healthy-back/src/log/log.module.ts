import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { IpLog } from '../database/entities/iplog.entitiy';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([IpLog])],
  controllers: [LogController],
  providers: [LogService],
  exports: [TypeOrmModule],
})
export class LogModule {}
