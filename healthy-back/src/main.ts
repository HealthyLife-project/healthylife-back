import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());

  // Swagger 설정
  const options = new DocumentBuilder()
    .setTitle('healthy')
    .setDescription('healthy project')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // 정적 파일 접근 (예: http://localhost:5001/uploads/ads/xxx.png)
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  // CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'http://43.203.38.38:4000',
      'http://3.39.205.170:3000/',
    ],
    credentials: true,
  });

  await app.listen(5001);
}

bootstrap();
