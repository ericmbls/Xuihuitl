import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePreferencesDto } from '../auth/dto/update-preferences.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async updatePreferences(userId: number, dto: UpdatePreferencesDto) {
    
    const exists = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!exists) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
      select: {
        darkMode: true,
        language: true,
        farmName: true,
        location: true,
      },
    });
  }

  async getPreferences(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        darkMode: true,
        language: true,
        farmName: true,
        location: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    return user;
  }
}