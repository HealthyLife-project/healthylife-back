import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewsService } from './news.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [NewsService],
  exports: [NewsService], // 필요 시 export 유지
})
export class NewsModule {}
