// src/barbeiros/barbeiros.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barbeiro } from './barbeiro.entity';

@Injectable()
export class BarbeirosService {
  constructor(
    @InjectRepository(Barbeiro)
    private barbeirosRepository: Repository<Barbeiro>,
  ) {}

  // ✅ CORRIGIDO: Padronizado para 'encontrarTodos'
  async encontrarTodos(): Promise<Barbeiro[]> {
    return this.barbeirosRepository.find({ where: { ativo: true } });
  }

  // ✅ CORRIGIDO: Padronizado para 'encontrarPorId'
  async encontrarPorId(id: number): Promise<Barbeiro> {
    const barbeiro = await this.barbeirosRepository.findOne({ where: { id } });
    if (!barbeiro) {
      throw new NotFoundException(`Barbeiro com ID ${id} não encontrado`);
    }
    return barbeiro;
  }

  async criar(barbeiroData: Partial<Barbeiro>): Promise<Barbeiro> {
    const barbeiro = this.barbeirosRepository.create(barbeiroData);
    return await this.barbeirosRepository.save(barbeiro);
  }

  async atualizar(id: number, barbeiroData: Partial<Barbeiro>): Promise<Barbeiro> {
    await this.barbeirosRepository.update(id, barbeiroData);
    return this.encontrarPorId(id);
  }

  async remover(id: number): Promise<void> {
    await this.barbeirosRepository.delete(id);
  }
}