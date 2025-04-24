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
import { AiService } from './ai.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('ai')
@ApiTags('AI')
export class AiController {
  constructor(private readonly aiService: AiService) {}
  @Post('generate')
  async generateText(@Body('prompt') prompt: string) {
    return this.aiService.generateText(prompt);
  }

  @Post('imageText')
  @ApiOperation({
    summary: '텍스트 기반 이미지 생성',
    description: '텍스트를 기반으로 Unsplash에서 이미지를 검색해 반환합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          example: 'sunset beach',
          description: '검색할 이미지 키워드',
        },
      },
    },
  })
  @ApiOkResponse({
    description: '이미지 URL 배열을 반환합니다.',
    schema: {
      type: 'array',
      items: {
        type: 'string',
        example: 'https://images.unsplash.com/photo-1234567890',
      },
    },
  })
  async imageCreative(@Body('text') text: string) {
    const res = await this.aiService.imageCreate(text);

    return res;
  }
}
