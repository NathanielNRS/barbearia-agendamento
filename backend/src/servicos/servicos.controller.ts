// src/services/services.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { Servico } from './servico.entity';

@Controller('api/servicos')
export class ServicosController { // ✅ Renomeado para ServicosController
  constructor(private readonly servicosService: ServicosService) {} // ✅ Nome do service corrigido

  @Get()
  async listarTodos(): Promise<Servico[]> { 
    return this.servicosService.encontrarTodos(); // ✅ Padronizado
  }

  @Get(':id')
  async encontrarPorId(@Param('id') id: string): Promise<Servico> { 
    return this.servicosService.encontrarPorId(+id); // ✅ Padronizado
  }

  @Post()
  async criar(@Body() servicoData: Partial<Servico>): Promise<Servico> { 
    return this.servicosService.criar(servicoData); // ✅ Padronizado
  }

  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() servicoData: Partial<Servico>): Promise<Servico> {
    return this.servicosService.atualizar(+id, servicoData); // ✅ Novo método adicionado
  }

  @Delete(':id')
  async remover(@Param('id') id: string): Promise<void> {
    return this.servicosService.remover(+id); // ✅ Padronizado
  }
}