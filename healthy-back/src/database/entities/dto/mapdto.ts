import { ApiProperty } from '@nestjs/swagger';

export class SearchMapDto {
  @ApiProperty({ example: 36.6283, description: '위도' })
  lat: number;

  @ApiProperty({ example: 127.456, description: '경도' })
  lng: number;
}

export class FindMapDto {
  @ApiProperty({
    example: '충청북도 청주시 오송생명3로 111',
    description: '주소 문자열',
  })
  address: string;
}

export class FindAddressDto {
  @ApiProperty({
    example: '위도',
  })
  latitude: number;

  @ApiProperty({
    example: '경도',
  })
  longitude: number;

  @ApiProperty({
    example: '주소',
  })
  address: string;
}

export class SearchAddressMarkerDto {
  @ApiProperty({
    example: '서울 서대문구 연희동 188-51',
    description: '지번 주소',
  })
  address_name: string;

  @ApiProperty({
    example: '',
    description: '카테고리 그룹 코드 (예: FD6 = 음식점)',
  })
  category_group_code: string;

  @ApiProperty({
    example: '',
    description: '카테고리 그룹 이름 (예: 음식점)',
  })
  category_group_name: string;

  @ApiProperty({
    example: '스포츠,레저 > 스포츠시설 > 헬스클럽',
    description: '상세 카테고리 경로',
  })
  category_name: string;

  @ApiProperty({
    example: '620',
    description: '중심 좌표에서의 거리 (미터 단위)',
  })
  distance: string;

  @ApiProperty({
    example: '1422817398',
    description: '장소 ID',
  })
  id: string;

  @ApiProperty({
    example: '',
    description: '전화번호',
  })
  phone: string;

  @ApiProperty({
    example: '파트너짐',
    description: '장소 이름',
  })
  place_name: string;

  @ApiProperty({
    example: 'http://place.map.kakao.com/1422817398',
    description: '카카오 장소 상세 페이지 URL',
  })
  place_url: string;

  @ApiProperty({
    example: '서울 서대문구 연희맛로 20',
    description: '도로명 주소',
  })
  road_address_name: string;

  @ApiProperty({
    example: '126.929966714534',
    description: '경도 (x)',
  })
  x: string;

  @ApiProperty({
    example: '37.5668468066729',
    description: '위도 (y)',
  })
  y: string;
}
