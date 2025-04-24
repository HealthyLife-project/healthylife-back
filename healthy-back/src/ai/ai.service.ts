import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import fetch from 'node-fetch';
import fs from 'node:fs';
@Injectable()
export class AiService {
  private readonly Gemini_API =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  constructor(private readonly configService: ConfigService) {}

  async generateText(prompt: string): Promise<string> {
    const apiKey = this.configService.get<string>('GOOGLE_GEMINI_KEY');
    //보낼 때 프롬포트 양식
    const requestData = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    try {
      //요청 보낼 때 headers 양식
      const res = await axios.post(
        `${this.Gemini_API}?key=${apiKey}`,
        requestData,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const candidates = res.data.candidates;
      if (!candidates || candidates.length === 0) {
        return '응답 데이터가 없습니다.';
      }

      return (
        candidates[0]?.content?.parts?.[0]?.text || '텍스트 응답이 아닐 경우.'
      );
    } catch (error) {
      if (error.response) {
        console.error(
          'API 호출 오류',
          error.response.data || error.response.status,
        );
      } else if (error.request) {
        console.error('API 요청 실패', error.request);
      } else {
        console.error('오류 메시지', error.message);
      }
      throw new Error('API 호출 실패');
    }
  }

  async imageCreate(text: string): Promise<string[]> {
    const accessKey = this.configService.get<string>('UNSPLASH_KEY');
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(text)}&per_page=10`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      },
    );

    const data = await res.json();

    interface UnsplashResponse {
      results: Array<{
        urls: {
          regular: string;
          full: string;
          thumb: string;
        };
      }>;
    }

    const responseJSON = data as UnsplashResponse;

    const images = responseJSON.results.map((img) => img.urls.regular);

    return images; // 프론트에선 img.src로 바로 사용 가능
  }
}
