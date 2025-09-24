import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('health')
  healthCheck() {
    return { 
      status: 'OK', 
      message: 'Servidor de autenticação está funcionando',
      timestamp: new Date().toISOString()
    };
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; senha: string }) {
    return this.authService.login(loginDto); 
  }

  @Post('registrar')
  async registrar(@Body() body: { nome: string; email: string; telefone: string; senha: string }) {
    return this.authService.registrar(body.nome, body.email, body.telefone, body.senha);
  }
}