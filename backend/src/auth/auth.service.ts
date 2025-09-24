import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService, 
  ) {}
  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuariosService.encontrarPorEmail(email);
    
    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      const { senha, ...result } = usuario;
      return result;
    }
    
    throw new UnauthorizedException('Email ou senha incorretos');
  }

async login(credenciais: { email: string; senha: string }) {
  const { email, senha } = credenciais;
  const usuario = await this.usuariosService.encontrarPorEmail(email);
  
  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
    throw new UnauthorizedException('Credenciais inválidas');
  }
  
  const payload = { email: usuario.email, sub: usuario.id };
  
  return {
    access_token: this.jwtService.sign(payload),
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }
  };
}

  async registrar(nome: string, email: string, telefone: string, senha: string) {
    const hashedSenha = await bcrypt.hash(senha, 10);
    return this.usuariosService.criar({ nome, email, telefone, senha: hashedSenha });
  }
}