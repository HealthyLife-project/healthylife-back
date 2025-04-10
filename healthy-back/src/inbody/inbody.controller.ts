import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { InbodyService } from './inbody.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateInbodyDto } from 'src/database/entities/dto/inbodydtop';

@ApiTags('inbody')
@Controller('inbody')
export class InbodyController {
  constructor(private readonly inbodyService: InbodyService) {}

  @Post('exerciseinfo/:id')
  @ApiOperation({ summary: '사용자의 인바디 정보 등록' })
  @ApiParam({ name: 'id', description: '사용자 ID', example: 1 })
  @ApiBody({ type: Object })
  async updateInbody(@Param('id') id: number, @Body() obj: any) {
    return await this.inbodyService.inbodyUpdate(id, obj);
  }

  @Get('userinfo/:id')
  @ApiOperation({
    summary: '인바디 정보 조회',
    description: '사용자의 ID로 인바디 정보를 조회합니다.',
  })
  @ApiParam({ name: 'id', type: Number, description: '사용자 ID' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 인바디 정보를 반환함',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: '사용자의 인바디 정보를 찾을 수 없음',
  })
  async getInbodyInfo(@Param('id') id: number) {
    return await this.inbodyService.inbodyInfoGet(id);
  }
}
