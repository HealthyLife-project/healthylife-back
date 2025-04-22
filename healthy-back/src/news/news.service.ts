import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class NewsService {
  private readonly NAVER_CLIENT: string;
  private readonly NAVER_SECRET: string;

  constructor(private readonly configService: ConfigService) {
    this.NAVER_CLIENT = this.configService.get<string>('NAVER_NEW_KEY', '');
    this.NAVER_SECRET = this.configService.get<string>(
      'NAVER_NEW_SECRET_KEY',
      '',
    );
  }

  // 네이버 뉴스 API 요청
  private async getNewsFromAPI(query: string) {
    const url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}&display=5&sort=date`;

    try {
      const res = await axios.get(url, {
        headers: {
          'X-Naver-Client-Id': this.NAVER_CLIENT,
          'X-Naver-Client-Secret': this.NAVER_SECRET,
        },
      });

      return res.data.items;
    } catch (error) {
      console.error('네이버 뉴스 API 요청 실패:', error);
      throw new Error('네이버 뉴스 API 요청 중 오류 발생');
    }
  }

  // 운동 건강 뉴스
  async getHealthNews() {
    return this.getNewsFromAPI('운동 건강');
  }

  // 반려동물 건강 뉴스
  async getPetHealthNews() {
    return this.getNewsFromAPI('반려동물 건강');
  }
}
