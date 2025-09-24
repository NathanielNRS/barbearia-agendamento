// js/agendamentos.js

class AgendamentoPage {
    constructor() {
        this.apiService = new ApiService(); // Assume que ApiService está em api.js
        this.form = document.getElementById('form-agendamento');
        this.selectBarbeiro = document.getElementById('select-barbeiro');
        this.selectServico = document.getElementById('select-servico');
        this.inputData = document.getElementById('input-data');
        this.selectHorario = document.getElementById('select-horario');
        this.btnAgendar = document.getElementById('btn-agendar');
        this.mensagemDiv = document.getElementById('mensagem');
        this.listaAgendamentos = document.getElementById('lista-agendamentos');

        this.carregarDadosIniciais();
        this.configurarEventos();
        this.carregarMeusAgendamentos();
    }

    async carregarDadosIniciais() {
        try {
            // Carrega barbeiros
            const barbeiros = await this.apiService.getBarbeiros();
            this.preencherSelect(this.selectBarbeiro, barbeiros, 'id', 'nome');

            // Carrega serviços
            const servicos = await this.apiService.getServicos();
            this.preencherSelect(this.selectServico, servicos, 'id', 'nome', 'preco');

            // Define a data mínima como hoje
            const hoje = new Date().toISOString().split('T')[0];
            this.inputData.min = hoje;

        } catch (error) {
            this.mostrarMensagem('Erro ao carregar dados: ' + error.message, 'erro');
        }
    }

    preencherSelect(select, dados, valorKey, textoKey, extraKey = null) {
        select.innerHTML = '';
        const optionDefault = document.createElement('option');
        optionDefault.value = '';
        optionDefault.textContent = `Selecione ${select.id.replace('select-', '')}`;
        select.appendChild(optionDefault);

        dados.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valorKey];
            let texto = item[textoKey];
            if (extraKey) texto += ` - R$ ${item[extraKey]}`;
            option.textContent = texto;
            select.appendChild(option);
        });
    }

    configurarEventos() {
        this.inputData.addEventListener('change', () => {
            this.carregarHorariosDisponiveis();
        });

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.fazerAgendamento();
        });
    }

    async carregarHorariosDisponiveis() {
        const data = this.inputData.value;
        const barbeiroId = this.selectBarbeiro.value;

        if (!data || !barbeiroId) {
            this.selectHorario.innerHTML = '<option value="">Selecione data e barbeiro</option>';
            return;
        }

        try {
            this.selectHorario.innerHTML = '<option value="">Carregando...</option>';
            const horarios = await this.apiService.getHorariosDisponiveis(barbeiroId, data);
            
            this.selectHorario.innerHTML = '';
            if (horarios.length === 0) {
                this.selectHorario.innerHTML = '<option value="">Nenhum horário disponível</option>';
                return;
            }

            horarios.forEach(horario => {
                const option = document.createElement('option');
                option.value = horario;
                option.textContent = horario;
                this.selectHorario.appendChild(option);
            });
        } catch (error) {
            this.mostrarMensagem('Erro ao carregar horários: ' + error.message, 'erro');
        }
    }

    async fazerAgendamento() {
        const agendamentoData = {
            barbeiroId: this.selectBarbeiro.value,
            servicoId: this.selectServico.value,
            data: this.inputData.value,
            horario: this.selectHorario.value
        };

        // Validação básica
        if (!agendamentoData.barbeiroId || !agendamentoData.servicoId || 
            !agendamentoData.data || !agendamentoData.horario) {
            this.mostrarMensagem('Por favor, preencha todos os campos.', 'erro');
            return;
        }

        try {
            this.btnAgendar.disabled = true;
            this.btnAgendar.textContent = 'Agendando...';

            const resultado = await this.apiService.criarAgendamento(agendamentoData);
            this.mostrarMensagem('Agendamento realizado com sucesso!', 'sucesso');
            this.form.reset();
            this.carregarMeusAgendamentos(); // Recarrega a lista

        } catch (error) {
            this.mostrarMensagem('Erro ao agendar: ' + error.message, 'erro');
        } finally {
            this.btnAgendar.disabled = false;
            this.btnAgendar.textContent = 'Confirmar Agendamento';
        }
    }

    mostrarMensagem(texto, tipo = 'info') {
        this.mensagemDiv.textContent = texto;
        this.mensagemDiv.className = `mensagem ${tipo}`;
        this.mensagemDiv.style.display = 'block';

        // Some automaticamente após 5 segundos
        setTimeout(() => {
            this.mensagemDiv.style.display = 'none';
        }, 5000);
    }

    async carregarMeusAgendamentos() {
        try {
            const agendamentos = await this.apiService.getMeusAgendamentos();
            this.exibirAgendamentos(agendamentos);
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
        }
    }

    exibirAgendamentos(agendamentos) {
        if (agendamentos.length === 0) {
            this.listaAgendamentos.innerHTML = '<li>Você não possui agendamentos.</li>';
            return;
        }

        this.listaAgendamentos.innerHTML = '';
        agendamentos.forEach(agendamento => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${agendamento.data}</strong> às ${agendamento.horario}
                - ${agendamento.barbeiro_nome} (${agendamento.servico_nome})
                <button onclick="cancelarAgendamento(${agendamento.id})">Cancelar</button>
            `;
            this.listaAgendamentos.appendChild(li);
        });
    }
}

// Inicializa a página quando carregada
document.addEventListener('DOMContentLoaded', () => {
    new AgendamentoPage();
});

// Função global para cancelar agendamento (precisa ser implementada no ApiService)
async function cancelarAgendamento(id) {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
        try {
            const api = new ApiService();
            await api.cancelarAgendamento(id);
            alert('Agendamento cancelado com sucesso!');
            location.reload(); // Recarrega a página para atualizar a lista
        } catch (error) {
            alert('Erro ao cancelar: ' + error.message);
        }
    }
}