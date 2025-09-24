// src/barbeiros/barbeiros.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BarbeirosService } from './barbeiros.service';
import { Barbeiro } from './barbeiro.entity';

@Controller('api/barbeiros')
export class BarbeirosController {
  constructor(private readonly barbeirosService: BarbeirosService) {}

  @Get()
  async listarTodos(): Promise<Barbeiro[]> {
    return this.barbeirosService.encontrarTodos();
  }

  @Get(':id')
  async encontrarPorId(@Param('id') id: string): Promise<Barbeiro> {
    return this.barbeirosService.encontrarPorId(+id);
  }

  @Post()
  async criar(@Body() barbeiroData: Partial<Barbeiro>): Promise<Barbeiro> {
    return this.barbeirosService.criar(barbeiroData);
  }

  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() barbeiroData: Partial<Barbeiro>): Promise<Barbeiro> {
    return this.barbeirosService.atualizar(+id, barbeiroData);
  }

  @Delete(':id')
  async remover(@Param('id') id: string): Promise<void> {
    return this.barbeirosService.remover(+id);
  }
}