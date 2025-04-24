import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LogModule } from './admin/log/log.module';
import { AiModule } from './ai/ai.module';
import { PayModule } from './pay/pay.module';
import { HashModule } from './hash/hash.module';
import { AdModule } from './admin/ad/ad.module';
import { InbodyModule } from './inbody/inbody.module';
import { MapsModule } from './maps/maps.module';
import { SeederModule } from './seed/seeder.module';
@Module({
  imports: [
    DatabaseModule,
    LogModule,
    AiModule,
    PayModule,
    HashModule,
    AdModule,
    InbodyModule,
    MapsModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
