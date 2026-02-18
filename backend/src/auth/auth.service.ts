import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(body: any) {
    const { name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) throw new UnauthorizedException('El correo ya está registrado');

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.user,
      },
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario registrado exitosamente',
      access_token: token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  async login(body: any) {
    const { email, password } = body;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      access_token: token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}