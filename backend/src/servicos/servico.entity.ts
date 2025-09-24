// src/services/servico.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Agendamento } from '../agendamentos/agendamento.entity';

@Entity()
export class Servico { 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal')
  preco: number;

  @Column('int')
  duracao: number; // duração em minutos

  @OneToMany(() => Agendamento, agendamento => agendamento.servico)
  agendamentos: Agendamento[];
}