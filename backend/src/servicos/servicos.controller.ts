import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { Servico } from './servico.entity';

@Controller('api/servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Get()
  async listarTodos(): Promise<Servico[]> { 
    return this.servicosService.encontrarTodos();
  }

  @Get(':id')
  async encontrarPorId(@Param('id') id: string): Promise<Servico> { 
    return this.servicosService.encontrarPorId(+id);
  }

  @Post()
  async criar(@Body() servicoData: Partial<Servico>): Promise<Servico> { 
    return this.servicosService.criar(servicoData); 
  }

  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() servicoData: Partial<Servico>): Promise<Servico> {
    return this.servicosService.atualizar(+id, servicoData);
  }

  @Delete(':id')
  async remover(@Param('id') id: string): Promise<void> {
    return this.servicosService.remover(+id);
  }
}