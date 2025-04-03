import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import axios from 'axios';

//데이터 가져오는 데에 제한이 있어 캐시파일에 담아두고 꺼내두기

@Injectable()
export class NewsService {
  private readonly NAVER_CLIENT: string;
  private readonly NAVER_SECRET: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis, //  ioredis 사용
  ) {
    this.NAVER_CLIENT = this.configService.get<string>('NAVER_NEW_KEY', '');
    this.NAVER_SECRET = this.configService.get<string>(
      'NAVER_NEW_SECRET_KEY',
      '',
    );
  }

  //  뉴스 가져오기 (캐싱 적용)
  async getCachedNews(query: string) {
    const cachedNews = await this.redis.get(query);

    if (cachedNews) {
      return JSON.parse(cachedNews);
    }

    console.log(' 캐시 없음');
    const news = await this.getNewsFromAPI(query);
    await this.redis.set(query, JSON.stringify(news), 'EX', 3600); // 1시간 캐싱

    return news;
  }

  //  네이버 뉴스 API 요청  display가 5개까지
  private async getNewsFromAPI(query: string) {
    const url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}&display=5&sort=date`;

    try {
      const res = await axios.get(url, {
        headers: {
          //양식
          'X-Naver-Client-Id': this.NAVER_CLIENT,
          'X-Naver-Client-Secret': this.NAVER_SECRET,
        },
      });

      return res.data.items; // 뉴스 목록
    } catch (error) {
      console.error('네이버 뉴스 API 요청 실패:', error);
      throw new Error('네이버 뉴스 API 요청 중 오류 발생');
    }
  }

  // 운동 건강 뉴스
  async getHealthNews() {
    return this.getCachedNews('운동 건강');
  }

  // 반려동물 건강 뉴스
  async getPetHealthNews() {
    return this.getCachedNews('반려동물 건강');
  }
}
