// src/agendamentos/agendamento.entity.ts - CORRIJA
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Servico } from '../servicos/servico.entity';
import { Barbeiro } from '../barbeiros/barbeiro.entity';

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id' }) // ✅ ADICIONE ESTA COLUNA
  usuario_id: number;

  @ManyToOne(() => Barbeiro, { eager: true })
  @JoinColumn({ name: 'barbeiro_id' })
  barbeiro: Barbeiro;

  @Column({ name: 'barbeiro_id' }) // ✅ ADICIONE ESTA COLUNA
  barbeiro_id: number;

  @ManyToOne(() => Servico, { eager: true })
  @JoinColumn({ name: 'servico_id' })
  servico: Servico;

  @Column({ name: 'servico_id' }) // ✅ ADICIONE ESTA COLUNA
  servico_id: number;

  @Column()
  data_agendamento: Date;

  @Column({ type: 'varchar', length: 5 })
  horario: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  data_criacao: Date;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @Column({
    type: 'enum',
    enum: ['confirmado', 'pendente', 'cancelado', 'concluido'],
    default: 'confirmado'
  })
  status: string;
}