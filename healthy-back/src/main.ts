import * as dotenv from 'dotenv';
dotenv.config();
import { writeFileSync } from 'fs';
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
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('api', app, document);

  // 정적 파일 접근 (예: http://localhost:5001/uploads/ads/xxx.png)
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  // CORS
  app.enableCors({
    origin: true, // 모든 origin 허용하되 credentials까지 허용됨
    credentials: true,
  });

  await app.listen(5001);
}

bootstrap();
