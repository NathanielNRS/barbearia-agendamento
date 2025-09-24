import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servico } from './servico.entity';

@Injectable()
export class ServicosService { 
  constructor(
    @InjectRepository(Servico) 
    private servicosRepository: Repository<Servico>, 
  ) {}

  async encontrarTodos(): Promise<Servico[]> {
    return this.servicosRepository.find();
  }

  async encontrarPorId(id: number): Promise<Servico> {
    const servico = await this.servicosRepository.findOne({ where: { id } });
    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }
    return servico;
  }

  async criar(servicoData: Partial<Servico>): Promise<Servico> {
    const servico = this.servicosRepository.create(servicoData);
    return await this.servicosRepository.save(servico);
  }

  async atualizar(id: number, servicoData: Partial<Servico>): Promise<Servico> {
    await this.servicosRepository.update(id, servicoData);
    return this.encontrarPorId(id);
  }

  async remover(id: number): Promise<void> {
    await this.servicosRepository.delete(id);
  }
}