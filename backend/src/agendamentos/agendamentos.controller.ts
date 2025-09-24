import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { Agendamento } from './agendamento.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/agendamentos')
@UseGuards(JwtAuthGuard)
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) { }

  @Get()
  async listarTodos(): Promise<Agendamento[]> {
    return this.agendamentosService.encontrarTodos();
  }

  @Get('usuario/:usuarioId')
  async listarPorUsuario(@Param('usuarioId') usuarioId: number): Promise<Agendamento[]> {
    return this.agendamentosService.encontrarPorUsuarioId(usuarioId);
  }

  @Get('horarios')
  async findHorariosDisponiveis(
    @Query('barbeiroId') barbeiroId: string,
    @Query('data') data: string
  ): Promise<string[]> {
    return this.agendamentosService.findHorariosDisponiveis(
      parseInt(barbeiroId),
      data
    );
  }

  @Get('meus')
  async getMeusAgendamentos(@Req() req: any): Promise<Agendamento[]> {
    const usuarioId = req.user.id;
    return this.agendamentosService.encontrarPorUsuarioId(usuarioId);
  }

  @Get(':id')
  async encontrarPorId(@Param('id') id: number): Promise<Agendamento> {
    return this.agendamentosService.encontrarPorId(id);
  }

  @Post()
  async criar(@Body() agendamentoData: any, @Req() req: any): Promise<Agendamento> { 
    console.log(' ============ DEBUG CONTROLLER ============');
    console.log(' Dados recebidos do frontend:');
    console.log('   Barbeiro ID:', agendamentoData.barbeiro_id, 'tipo:', typeof agendamentoData.barbeiro_id);
    console.log('   Serviço ID:', agendamentoData.servico_id, 'tipo:', typeof agendamentoData.servico_id);
    console.log('   Data:', agendamentoData.data_agendamento);
    console.log('   Horário:', agendamentoData.horario);
    console.log('   Usuário autenticado ID:', req.user?.id);
    console.log('   Dados completos:', agendamentoData);

    const dadosConvertidos = {
      barbeiro_id: parseInt(agendamentoData.barbeiro_id),
      servico_id: parseInt(agendamentoData.servico_id),
      data_agendamento: agendamentoData.data_agendamento,
      horario: agendamentoData.horario,
      usuario_id: req.user.id
    };

    console.log('Dados após conversão:');
    console.log('   Barbeiro ID:', dadosConvertidos.barbeiro_id, 'tipo:', typeof dadosConvertidos.barbeiro_id);
    console.log('   Serviço ID:', dadosConvertidos.servico_id, 'tipo:', typeof dadosConvertidos.servico_id);
    console.log('   Usuário ID:', dadosConvertidos.usuario_id, 'tipo:', typeof dadosConvertidos.usuario_id);

    if (isNaN(dadosConvertidos.barbeiro_id) || isNaN(dadosConvertidos.servico_id)) {
      console.error('ERRO: IDs inválidos após conversão');
      throw new Error('IDs de barbeiro ou serviço inválidos');
    }

    console.log('Enviando para o service...');
    return this.agendamentosService.criar(dadosConvertidos);
  }

  @Put(':id/cancelar')
  async cancelar(@Param('id') id: number): Promise<Agendamento> {
    return this.agendamentosService.cancelar(id);
  }

  @Delete(':id')
  async remover(@Param('id') id: number): Promise<void> {
    return this.agendamentosService.remover(id);
  }
}