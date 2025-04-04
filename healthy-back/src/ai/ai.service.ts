import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly Gemini_API =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  constructor(private readonly configService: ConfigService) {}

  async generateText(prompt: string): Promise<string> {
    const apiKey = this.configService.get<string>('GOOGLE_GEMINI_KEY');
    const requestData = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    try {
      const res = await axios.post(
        `${this.Gemini_API}?key=${apiKey}`,
        requestData,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      console.log('테스트', JSON.stringify(res.data, null, 2));
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

  async imageCreate(requestBody: any): Promise<any> {
    const engineId = 'stable-diffusion-v1-6';
    const apiHost = 'https://api.stability.ai';
    const apikey = this.configService.get<string>('STABLE_KEY');
    const res = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apikey}`,
        },
        body: JSON.stringify(requestBody),
      },
    );

    return res;
  }
}
