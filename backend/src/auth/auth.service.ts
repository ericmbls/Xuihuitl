import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(body: any) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return {
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
