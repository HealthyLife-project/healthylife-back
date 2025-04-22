import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService], // 필요 시 export 유지
})
export class NewsModule {}
