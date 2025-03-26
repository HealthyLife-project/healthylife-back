import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const options = new DocumentBuilder()
    .setTitle('My API') // API 제목
    .setDescription('API documentation for My project') // API 설명
    .setVersion('1.0') // 버전
    .addTag('users') // 태그 추가 (예: users)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // Swagger UI는 '/api' 경로에서 확인

  // CORS 설정 (모든 도메인 허용)
  app.enableCors();

  // 5000번 포트에서 서버 실행
  await app.listen(5000);
}
bootstrap();
