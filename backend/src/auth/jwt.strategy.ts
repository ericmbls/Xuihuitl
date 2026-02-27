// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecret',
    });
  }

  async validate(payload: any) {
    // payload debe tener { sub: id, email, role }
    console.log('JWT Payload:', payload); // <-- Agrega este log para depurar
    return { 
      id: payload.sub,     // ¡Esto es crucial!
      email: payload.email,
      role: payload.role 
    };
  }
}