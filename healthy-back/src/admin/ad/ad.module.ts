import { Module } from '@nestjs/common';
import { AdService } from './ad.service';
import { AdController } from './ad.controller';
import { Adb } from 'src/database/entities/ad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Adb])],
  controllers: [AdController],
  providers: [AdService],
})
export class AdModule {}
