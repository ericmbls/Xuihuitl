import { PartialType } from '@nestjs/mapped-types';
import { CreateCultivoDto } from './create-cultivo.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoCultivo } from '@prisma/client';

export class UpdateCultivoDto extends PartialType(CreateCultivoDto) {
  @IsEnum(EstadoCultivo)
  @IsOptional()
  estado?: EstadoCultivo;
}