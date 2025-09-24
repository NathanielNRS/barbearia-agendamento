const API_BASE_URL = 'http://localhost:3001';

class ApiService {
    constructor() {
        this.token = localStorage.getItem('authToken');
    }

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options
        };

        if (this.token) {
            config.headers['Authorization'] = `Bearer ${this.token}`;
        }

        if (options.body) {
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(url, config);

            if (response.status === 401) {
                console.warn('Token expirado ou inválido. Fazendo logout...');

                let errorDetail = 'Sessão expirada';
                try {
                    const errorData = await response.json();
                    errorDetail = errorData.message || errorDetail;
                } catch (e) {
                }

                this.logout();
                throw new Error(errorDetail);
            }

            if (!response.ok) {
                let errorMsg = 'Erro na requisição';
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch (e) {
                    errorMsg = response.statusText || errorMsg;
                }
                throw new Error(errorMsg);
            }

            if (response.status === 204) {
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);

            if (error.message.includes('Failed to fetch')) {
                throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
            }

            throw error;
        }
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    logout() {
        this.token = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('usuario');
    }

    async login(email, senha) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: { email, senha },
        });

        if (data.access_token) {
            this.setToken(data.access_token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
        }
        return data;
    }

    async registrar(usuarioData) {
        return this.request('/auth/registrar', {
            method: 'POST',
            body: usuarioData,
        });
    }

    async getBarbeiros() {
        return this.request('/api/barbeiros');
    }

    async getServicos() {
        return this.request('/api/servicos');
    }

    async getHorariosDisponiveis(barbeiroId, data) {
        return this.request(`/api/agendamentos/horarios?barbeiroId=${barbeiroId}&data=${data}`);
    }

    async criarAgendamento(agendamentoData) {
        const dadosCorrigidos = {
            ...agendamentoData,
            barbeiro_id: parseInt(agendamentoData.barbeiro_id),
            servico_id: parseInt(agendamentoData.servico_id),
            usuario_id: parseInt(agendamentoData.usuario_id)
        };

        console.log('Dados do agendamento (CORRIGIDOS):', dadosCorrigidos);

        return this.request('/api/agendamentos', {
            method: 'POST',
            body: dadosCorrigidos,
        });
    }

    async getMeusAgendamentos() {
        return this.request('/api/agendamentos/meus');
    }

    async cancelarAgendamento(id) {
        return this.request(`/api/agendamentos/${id}/cancelar`, {
            method: 'PUT',
        });
    }

    async listarAgendamentos() {
        return this.request('/api/agendamentos');
    }

    async listarServicos() {
        return this.request('/api/servicos');
    }
}

window.apiService = new ApiService();