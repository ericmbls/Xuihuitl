import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePreferencesDto } from '../auth/dto/update-preferences.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async updatePreferences(userId: number, dto: UpdatePreferencesDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });
  }

  async getPreferences(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { darkMode: true },
    });
  }
}