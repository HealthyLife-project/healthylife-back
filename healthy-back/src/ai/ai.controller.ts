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

type RequestBody = {
  text_prompts: {
    text: string;
  }[];
  samples: number;
  cfg_scale: number;
  steps: number;
  style_preset: string;
};
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}
  @Post('generate')
  async generateText(@Body('prompt') prompt: string) {
    console.log('ai/generate 콘솔 로그 확인용');
    return this.aiService.generateText(prompt);
  }

  @Post('imageText')
  async imageCreative(@Body('text') text: string) {
    const requestBody: RequestBody = {
      text_prompts: [
        {
          text: text, // <- 여기에 들어감
        },
      ],
      samples: 1,
      cfg_scale: 7,
      steps: 30,
      style_preset: 'cinematic',
    };
    const res = await this.aiService.imageCreate(requestBody);

    console.log(res.data);

    return res.data;
  }
}
