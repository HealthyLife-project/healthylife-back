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
import { CreateAiDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}
  @Post('generate')
  async generateText(@Body('prompt') prompt: string) {
    console.log('ai/generate 콘솔 로그 확인용');
    return this.aiService.generateText(prompt);
  }

  // @Post('imageText')
  // async imageCreative(@Body())
}
