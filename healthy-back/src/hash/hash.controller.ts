import { Controller, Get, Post, Body } from '@nestjs/common';
import { HashService } from './hash.service';
import { Hashtag } from '../database/entities/hash.entity';
import { Category } from '../database/entities/category.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('hash')
@Controller('hash')
export class HashController {
  constructor(private readonly hashService: HashService) {}

  @Get('AllCate') // Category 데이터를 가져오는 API
  @ApiOperation({
    summary: '카테고리 목록',
    description: '모든 카테고리 가져오기',
  })
  @ApiResponse({ status: 200, description: '성공', type: [Category] })
  async findAllCate(): Promise<Category[]> {
    return this.hashService.findAllCate();
  }
  @Post('onCate')
  @ApiOperation({
    summary: '카테고리 추가',
    description: '입력받은 카테고리 추가',
  })
  @ApiResponse({ status: 200, description: '생성', type: Category })
  async createCategory(@Body('category') category: string): Promise<Category> {
    return this.hashService.createCategory(category);
  }
}
