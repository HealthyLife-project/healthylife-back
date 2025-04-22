import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('News') // Swagger에서 그룹명으로 사용됨
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('health/:category')
  @ApiOperation({ summary: '주제별 뉴스 가져오기' })
  @ApiOkResponse({
    description: '주제별 최신 뉴스 5개를 반환합니다.',
  })
  async getNews(@Param('category') category: string) {
    return this.newsService.getNewsByCategory(category);
  }
}
