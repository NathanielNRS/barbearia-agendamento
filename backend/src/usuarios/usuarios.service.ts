import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async encontrarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { email } });
  }

  async criar(usuarioData: Partial<Usuario>): Promise<Usuario> {
    const usuario = this.usuariosRepository.create(usuarioData);
    return this.usuariosRepository.save(usuario);
  }

  async encontrarPorId(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  async listarTodos(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async atualizar(id: number, usuarioData: Partial<Usuario>): Promise<Usuario> {
    await this.usuariosRepository.update(id, usuarioData);
    return this.encontrarPorId(id);
  }
}