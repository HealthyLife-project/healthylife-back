import { Controller, Post, Body } from '@nestjs/common';
import { MapsService } from './maps.service';
import {
  SearchAddressMarkerDto,
  SearchMapDto,
  FindAddressDto,
  FindMapDto,
} from 'src/database/entities/dto/mapdto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';

@ApiTags('Maps')
@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Post('search')
  @ApiOperation({
    summary: '위도/경도로 주변 장소 검색',
    description: '위도(lat)와 경도(lng)를 기반으로 피트니스 장소를 검색',
  })
  @ApiBody({ type: SearchMapDto })
  @ApiResponse({
    status: 201,
    description: '검색 성공',
    type: SearchAddressMarkerDto,
    isArray: true,
  })
  async searchMap(@Body() body: SearchMapDto) {
    const { lat, lng } = body;
    return this.mapsService.searchNearby(lat, lng);
  }

  @Post('find')
  @ApiOperation({
    summary: '주소로 위도/경도 찾기',
    description: '입력된 주소 문자열로 좌표를 검색',
  })
  @ApiBody({ type: FindMapDto })
  @ApiResponse({
    status: 201,
    description: '좌표 검색 성공',
    type: FindAddressDto,
  })
  async findMap(@Body('address') address: string) {
    return await this.mapsService.searchFindAddress(address);
  }
}
