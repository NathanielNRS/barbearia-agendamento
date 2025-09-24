/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  /*app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  app.enableCors({
  origin: ['http://localhost', 'http://localhost:3000', 'http://localhost:80'],
  credentials: true,
});
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3001);
  console.log('Backend running on http://localhost:3001');
}

bootstrap();*/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração de CORS AMPLA para Desenvolvimento
  app.enableCors({
    origin: true, // Permite TODAS as origens. Mude para uma URL específica depois.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Todos os métodos necessários
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Cabeçalhos permitidos
    credentials: true, // Isso é importante se você usar cookies/sessões
  });
  
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3001);
  console.log('Backend running on http://localhost:3001');
}

bootstrap();