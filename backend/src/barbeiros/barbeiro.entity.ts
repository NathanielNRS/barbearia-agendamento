import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Agendamento } from '../agendamentos/agendamento.entity';

@Entity()
export class Barbeiro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ type: 'text', nullable: true })
  especialidades: string;

  @Column({ type: 'time', default: '08:00' })
  horario_inicio: string;

  @Column({ type: 'time', default: '18:00' })
  horario_fim: string;

  @OneToMany(() => Agendamento, agendamento => agendamento.barbeiro)
  agendamentos: Agendamento[];
}