import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';import { CultivosService } from './cultivos.service';

@Controller('cultivos')
export class CultivosController {
  constructor(private readonly cultivosService: CultivosService) {}

  @Get()
  findAll() {
    return this.cultivosService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.cultivosService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.cultivosService.update(Number(id), body);
  }
}