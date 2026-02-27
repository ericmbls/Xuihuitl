import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { CultivosService } from './cultivos.service';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { UpdateCultivoDto } from './dto/update-cultivo.dto';

@Controller('cultivos')
export class CultivosController {
  constructor(private readonly cultivosService: CultivosService) {}

  @Get()
  findAll() {
    return this.cultivosService.findAll();
  }

  @Post()
  create(@Body() createCultivoDto: CreateCultivoDto) {
    return this.cultivosService.create(createCultivoDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCultivoDto: UpdateCultivoDto,
  ) {
    return this.cultivosService.update(Number(id), updateCultivoDto);
  }
}