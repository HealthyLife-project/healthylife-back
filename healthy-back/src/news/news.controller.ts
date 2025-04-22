import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('News') // Swagger에서 그룹명으로 사용됨
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('health/:str')
  @ApiOperation({ summary: '운동 건강 뉴스 가져오기' })
  @ApiOkResponse({ description: '운동 건강 관련 최신 뉴스 5개를 반환합니다.' })
  async getHealthNews(@Param('str') str: string) {
    return this.newsService.getHealthNews(str);
  }

  @Get('pet-health/:str')
  @ApiOperation({ summary: '반려동물 건강 뉴스 가져오기' })
  @ApiOkResponse({
    description: '반려동물 건강 관련 최신 뉴스 5개를 반환합니다.',
  })
  async getPetHealthNews(@Param('str') str: string) {
    return this.newsService.getPetHealthNews(str);
  }
}
