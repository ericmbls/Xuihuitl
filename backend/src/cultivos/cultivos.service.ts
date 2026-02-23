import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CultivosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cultivo.findMany();
  }

  async create(data: any) {
    return this.prisma.cultivo.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.cultivo.update({
      where: { id },
      data,
    });
  }
}