import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapsService {
  async searchNearby(lat: number, lng: number): Promise<any[]> {
    const radius = 2000;
    const query = encodeURIComponent('피트니스');

    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?x=${lng}&y=${lat}&radius=${radius}&query=${query}`;

    const res = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_KEY}`,
        KA: 'sdk/1.0 os=web origin=http://localhost:4000 lang=ko-KR',
      },
    });

    return res.data.documents;
  }

  async searchFindAddress(str: string): Promise<any> {
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(str)}`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_KEY}`,
        },
      });

      if (res.data.documents.length === 0) {
        return { message: '검색 결과 없음' };
      }

      const { x, y, address_name } = res.data.documents[0];
      return {
        latitude: y,
        longitude: x,
        address: address_name,
      };
    } catch (error) {
      console.error('주소 → 좌표 변환 실패', error);
      throw new Error('주소 변환 실패');
    }
  }
}
