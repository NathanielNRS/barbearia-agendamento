import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Todos os métodos necessários
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Cabeçalhos permitidos
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3001);
  console.log('Backend running on http://localhost:3001');
}

bootstrap();