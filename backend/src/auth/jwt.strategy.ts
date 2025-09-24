// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // ✅ MANTENHA false, mas verifique o tempo
      secretOrKey: 'minha_chave_super_secreta_barbearia_2025@!',
    });
  }

  async validate(payload: any) {
    console.log('🔐 Validando JWT payload:', payload);
    return { 
      id: payload.sub, 
      email: payload.email,
      exp: payload.exp,
      iat: payload.iat  
    };
  }
}