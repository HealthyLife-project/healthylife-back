import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
    description: '해쉬태그명',
    type: UpdateLogDto,
  })
  async getAllLogs() {
    return await this.logService.getAllLogs();
  }
}
