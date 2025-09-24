import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Agendamento } from '../agendamentos/agendamento.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  nome: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  telefone: string;

  @Column()
  @IsNotEmpty()
  senha: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  data_criacao: Date;

  @OneToMany(() => Agendamento, agendamento => agendamento.usuario)
  agendamentos: Agendamento[];
}