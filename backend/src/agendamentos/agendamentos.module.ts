import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamento } from './agendamento.entity';
import { AgendamentosService } from './agendamentos.service';
import { AgendamentosController } from './agendamentos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamento])],
  providers: [AgendamentosService],
  controllers: [AgendamentosController],
  exports: [AgendamentosService],
})
export class AgendamentosModule {}