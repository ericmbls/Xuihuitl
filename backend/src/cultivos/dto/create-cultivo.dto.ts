import { IsString, IsNotEmpty, IsInt, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { EstadoCultivo } from '@prisma/client';

export class CreateCultivoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  @IsNotEmpty()
  fechaSiembra: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsInt()
  @IsNotEmpty()
  frecuenciaRiego: number;

  @IsEnum(EstadoCultivo)
  @IsOptional()
  estado?: EstadoCultivo;

  @IsInt()
  @IsNotEmpty()
  userId: number; 
}