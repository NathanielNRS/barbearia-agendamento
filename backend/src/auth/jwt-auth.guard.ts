import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    
    console.log('🛡️ JWT Guard - Verificando autenticação...');
    console.log('📨 URL:', request.url);
    console.log('🔑 Token presente:', !!token);
    console.log('📏 Token length:', token ? token.length : 'N/A');
    
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('🛡️ JWT Guard - Resultado da validação:');
    console.log('   ❌ Erro:', err);
    console.log('   👤 Usuário:', user);
    console.log('   ℹ️  Info:', info);
    
    if (err || !user) {
      console.error('🛡️ JWT Guard - FALHA NA AUTENTICAÇÃO');
      
      
      if (info instanceof Error) {
        console.error('   💡 Tipo de erro:', info.name);
        console.error('   💡 Mensagem:', info.message);
      }
      
      if (info && info.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado. Faça login novamente.');
      }
      
      if (info && info.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token inválido.');
      }
      
      throw new UnauthorizedException('Não autorizado.');
    }
    
    console.log('JWT Guard - Autenticação bem-sucedida para usuário:', user.email);
    return user;
  }
}