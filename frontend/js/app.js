class BarbeariaApp {
    constructor() {
        this.usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
        this.token = localStorage.getItem('authToken'); // ✅ Corrigido para authToken
        this.init();
    }

    init() {
        this.verificarAutenticacao();
        this.inicializarEventListeners();
    }

    verificarAutenticacao() {
        const paginaAtual = window.location.pathname;
        const paginaPublica = paginaAtual.includes('index.html') || 
                             paginaAtual.includes('login.html') || 
                             paginaAtual.includes('register.html') ||
                             paginaAtual === '/';

        // Se não está autenticado e tenta acessar página privada
        if ((!this.token || !this.usuario) && !paginaPublica) {
            window.location.href = 'login.html';
            return;
        }

        // ✅ Melhorado: Redireciona apenas se tentar acessar login/register já logado
        if (this.token && this.usuario && 
            (paginaAtual.includes('login.html') || paginaAtual.includes('register.html'))) {
            window.location.href = 'agendamentos.html';
        }
    }

    inicializarEventListeners() {
        // Login Form
        if (document.getElementById('loginForm')) {
            document.getElementById('loginForm').addEventListener('submit', (e) => {
                e.preventDefault();
                this.fazerLogin();
            });
        }

        // Register Form
        if (document.getElementById('registerForm')) {
            document.getElementById('registerForm').addEventListener('submit', (e) => {
                e.preventDefault();
                this.fazerRegistro();
            });
        }

        // Logout Buttons
        const logoutButtons = document.querySelectorAll('[data-logout]');
        logoutButtons.forEach(button => {
            button.addEventListener('click', () => this.fazerLogout());
        });
    }

    async fazerLogin() {
        try {
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            // ✅ Usa o apiService em vez de fetch manual!
            const data = await window.apiService.login(email, senha);
            
            // ✅ Atualiza os dados locais
            this.usuario = data.usuario;
            this.token = data.access_token;
            
            // ✅ Redireciona para agendamentos
            window.location.href = 'agendamentos.html';

        } catch (error) {
            alert('Erro ao fazer login: ' + error.message);
            console.error('Login error:', error);
        }
    }

    async fazerRegistro() {
        try {
            const formData = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                senha: document.getElementById('senha').value,
            };

            // ✅ Usa o apiService em vez de fetch manual!
            await window.apiService.registrar(formData);
            
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            window.location.href = 'login.html';

        } catch (error) {
            alert('Erro ao cadastrar: ' + error.message);
            console.error('Register error:', error);
        }
    }

    async fazerLogout() {
        try {
            // ✅ Usa o método logout do apiService
            window.apiService.logout();
            
        } catch (error) {
            console.error('Erro durante logout:', error);
            // Fallback: limpeza básica e redirecionamento
            localStorage.clear();
            window.location.href = 'login.html';
        }
    }

    // ✅ Método útil para outras páginas
    getUsuarioLogado() {
        return this.usuario;
    }

    // ✅ Método útil para verificar autenticação
    estaAutenticado() {
        return !!(this.token && this.usuario);
    }
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // ✅ Verifica se o apiService está disponível
    if (typeof window.apiService === 'undefined') {
        console.error('apiService não foi carregado! Certifique-se de carregar api.js primeiro.');
        return;
    }
    
    new BarbeariaApp();
});