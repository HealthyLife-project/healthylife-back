import { Controller, Post, Body, Param } from '@nestjs/common';
import { InbodyService } from './inbody.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
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
}
