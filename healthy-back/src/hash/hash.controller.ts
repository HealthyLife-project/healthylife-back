import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { HashService } from './hash.service';
import { Hashtag } from '../database/entities/hash.entity';
import { Category } from '../database/entities/category.entity';
import {
  CreateHashtagDto,
  CreateCategoryDto,
} from '../database/entities/dto/hashdto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('hashtag')
@Controller('hashtag')
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
  @ApiBody({
    description: '카테고리명',
    type: CreateCategoryDto,
  })
  async createCategory(@Body('category') category: string): Promise<Category> {
    return this.hashService.createCategory(category);
  }

  @Post('onHash')
  @ApiOperation({
    summary: '해쉬태그 추가',
    description: '입력받은 해쉬태그 추가',
  })
  @ApiBody({
    description: '해쉬태그명',
    type: CreateHashtagDto,
  })
  async createHashtag(
    @Body('hashtag') hashtag: string,
    @Body('categoryId') categoryId: number,
  ): Promise<Hashtag> {
    console.log(hashtag, categoryId);
    return this.hashService.createHashtag(hashtag, categoryId);
  }

  @Get('hash/:id')
  @ApiOperation({
    summary: '해시태그 조회',
    description: '카테고리 id에 해당하는 해시태그 조회',
  })
  @ApiParam({ name: 'id', description: '해시태그 ID' })
  async findAll(@Param('id') id: number): Promise<Hashtag[]> {
    const { oneHash } = await this.hashService.findAllHash(id); // { result, oneHash }에서 oneHash만 추출
    return oneHash; // 담긴 값을 반환
  }

  @Delete('delHash/:id')
  @ApiOperation({
    summary: '해시태그 제거',
  })
  @ApiParam({ name: 'id', description: '해시태그 ID' })
  async deleteHashtag(@Param('id') id: number): Promise<boolean> {
    const res = await this.hashService.deleteHash(id);

    return res.result;
  }

  @Get('allhash')
  @ApiOperation({
    summary: ' 해시태그 조회',
  })
  async findhash() {
    const res = await this.hashService.AllHash();

    return res;
  }

  @Delete('delCate/:id')
  @ApiOperation({
    summary: '카테고리 제거',
  })
  @ApiParam({ name: 'id', description: '카테고리 ID' })
  async deleteCategory(@Param('id') id: number): Promise<boolean> {
    const res = await this.hashService.deleteCate(id);

    return res.result;
  }
}
