import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LogModule } from './log/log.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [DatabaseModule, LogModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
