import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LogService } from './log.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateLogDto } from './dto/update-log.dto';

@ApiTags('log')
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @ApiOperation({
    summary: 'ip 주소',
  })
  @ApiBody({
    type: UpdateLogDto,
  })
  async getLogs(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;

    return this.logService.getLogs(pageNum, limitNum);
  }
}
