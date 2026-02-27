import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { UpdateCultivoDto } from './dto/update-cultivo.dto';

@Injectable()
export class CultivosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cultivo.findMany();
  }

  async create(data: CreateCultivoDto) {
    return this.prisma.cultivo.create({ data });
  }

  async update(id: number, data: UpdateCultivoDto) {
    try {
      return await this.prisma.cultivo.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Cultivo con id ${id} no encontrado`);
    }
  }

  async findOne(id: number) {
    const cultivo = await this.prisma.cultivo.findUnique({ where: { id } });
    if (!cultivo) throw new NotFoundException(`Cultivo con id ${id} no encontrado`);
    return cultivo;
  }

  async delete(id: number) {
    try {
      return await this.prisma.cultivo.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Cultivo con id ${id} no encontrado`);
    }
  }
}