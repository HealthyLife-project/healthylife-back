import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from 'src/database/entities/report.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from 'src/database/entities/dto/reportdto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('get')
  @ApiOperation({
    summary: 'report 목록',
  })
  @ApiResponse({ status: 200, type: [Report] })
  getReport() {
    return this.reportService.reportGet();
  }

  @Post('push')
  @ApiOperation({ summary: '신고 등록' })
  @ApiResponse({ status: 201, description: '신고 접수 완료' })
  async pushReport(@Body() reportdata: Partial<Report>) {
    const data = await this.reportService.create(reportdata);
    return { message: '신고 접수 완료.', data };
  }
}
