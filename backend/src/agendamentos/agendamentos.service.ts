// src/agendamentos/agendamentos.service.ts - CORRIGIDO
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Agendamento } from './agendamento.entity';

@Injectable()
export class AgendamentosService {
  constructor(
    @InjectRepository(Agendamento)
    private agendamentosRepository: Repository<Agendamento>,
  ) { }

  async encontrarTodos(): Promise<Agendamento[]> {
    return this.agendamentosRepository.find({
      relations: ['barbeiro', 'servico', 'usuario']
    });
  }

  async encontrarPorId(id: number): Promise<Agendamento> {
    const agendamento = await this.agendamentosRepository.findOne({ 
      where: { id },
      relations: ['barbeiro', 'servico', 'usuario']
    });
    if (!agendamento) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
    }
    return agendamento;
  }

  async encontrarPorUsuarioId(usuarioId: number): Promise<Agendamento[]> {
    return this.agendamentosRepository.find({
      where: { usuario_id: usuarioId },
      relations: ['barbeiro', 'servico'],
      order: { data_agendamento: 'DESC' }
    });
  }

  async criar(agendamentoData: any): Promise<Agendamento> { // ✅ Mude para 'any' para evitar erros TypeScript
    console.log('🔍 ============ DEBUG SERVICE ============');
    console.log('📥 Dados recebidos no service:');
    console.log('   barbeiro_id:', agendamentoData.barbeiro_id, 'tipo:', typeof agendamentoData.barbeiro_id);
    console.log('   servico_id:', agendamentoData.servico_id, 'tipo:', typeof agendamentoData.servico_id);
    console.log('   usuario_id:', agendamentoData.usuario_id, 'tipo:', typeof agendamentoData.usuario_id);
    console.log('   data_agendamento:', agendamentoData.data_agendamento);
    console.log('   horario:', agendamentoData.horario);
    console.log('   dados completos:', agendamentoData);

    // ✅ VALIDAÇÃO OBRIGATÓRIA
    if (!agendamentoData.barbeiro_id || !agendamentoData.servico_id || !agendamentoData.usuario_id) {
      throw new Error('Barbeiro, Serviço e Usuário são obrigatórios');
    }

    // ✅ CONVERSÃO DE TIPOS
    const dadosConvertidos = {
      barbeiro_id: parseInt(agendamentoData.barbeiro_id),
      servico_id: parseInt(agendamentoData.servico_id),
      usuario_id: parseInt(agendamentoData.usuario_id),
      data_agendamento: agendamentoData.data_agendamento,
      horario: agendamentoData.horario
    };

    console.log('✅ Dados após conversão:');
    console.log('   barbeiro_id:', dadosConvertidos.barbeiro_id, 'tipo:', typeof dadosConvertidos.barbeiro_id);
    console.log('   servico_id:', dadosConvertidos.servico_id, 'tipo:', typeof dadosConvertidos.servico_id);
    console.log('   usuario_id:', dadosConvertidos.usuario_id, 'tipo:', typeof dadosConvertidos.usuario_id);

    // ✅ VALIDAÇÃO FINAL
    if (isNaN(dadosConvertidos.barbeiro_id) || isNaN(dadosConvertidos.servico_id) || isNaN(dadosConvertidos.usuario_id)) {
      throw new Error('IDs inválidos fornecidos');
    }

    // ✅ CONVERSÃO DE DATA
    if (typeof dadosConvertidos.data_agendamento === 'string') {
      dadosConvertidos.data_agendamento = new Date(dadosConvertidos.data_agendamento + 'T00:00:00');
    }

    console.log('📅 Data convertida:', dadosConvertidos.data_agendamento);

    // ✅ CRIAÇÃO DO AGENDAMENTO
    try {
      console.log('💾 Tentando salvar no banco de dados...');
      const agendamento = this.agendamentosRepository.create(dadosConvertidos);
      const resultado = await this.agendamentosRepository.save(agendamento);
      
      console.log('🎉 AGENDAMENTO CRIADO COM SUCESSO!');
      console.log('   ID do agendamento:', resultado.id);
      console.log('   Barbeiro ID:', resultado.barbeiro_id);
      console.log('   Serviço ID:', resultado.servico_id);
      console.log('   Usuário ID:', resultado.usuario_id);
      console.log('   Data:', resultado.data_agendamento);
      console.log('   Horário:', resultado.horario);
      
      return resultado;
    } catch (error) {
      console.error('❌ ERRO AO SALVAR NO BANCO:');
      console.error('   Mensagem:', error.message);
      console.error('   Código do erro:', error.code);
      console.error('   Detalhes completos:', error);
      
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new Error('Erro de foreign key: Verifique se os IDs de barbeiro, serviço e usuário existem no banco');
      }
      
      throw error;
    }
  }

  async cancelar(id: number): Promise<Agendamento> {
    await this.agendamentosRepository.update(id, { status: 'cancelado' });
    return this.encontrarPorId(id);
  }

  async remover(id: number): Promise<void> {
    await this.agendamentosRepository.delete(id);
  }

  async findHorariosDisponiveis(barbeiroId: number, data: string): Promise<string[]> {
    const dataObj = new Date(data + 'T00:00:00');
    const startOfDay = new Date(dataObj);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dataObj);
    endOfDay.setHours(23, 59, 59, 999);

    const agendamentos = await this.agendamentosRepository.find({
      where: {
        barbeiro_id: barbeiroId,
        data_agendamento: Between(startOfDay, endOfDay),
        status: 'confirmado'
      }
    });

    const horariosTrabalho = this.gerarHorariosTrabalho();
    const horariosOcupados = agendamentos.map(ag => ag.horario);
    const horariosDisponiveis = horariosTrabalho.filter(
      horario => !horariosOcupados.includes(horario)
    );

    return horariosDisponiveis;
  }

  private gerarHorariosTrabalho(): string[] {
    const horarios: string[] = [];
    for (let hora = 8; hora <= 18; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        horarios.push(
          `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`
        );
      }
    }
    return horarios;
  }
}