class BarbeariaApp {
    constructor() {
        this.usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
        this.token = localStorage.getItem('authToken');
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

        if ((!this.token || !this.usuario) && !paginaPublica) {
            window.location.href = 'login.html';
            return;
        }

        if (this.token && this.usuario && 
            (paginaAtual.includes('login.html') || paginaAtual.includes('register.html'))) {
            window.location.href = 'agendamentos.html';
        }
    }

    inicializarEventListeners() {
        if (document.getElementById('loginForm')) {
            document.getElementById('loginForm').addEventListener('submit', (e) => {
                e.preventDefault();
                this.fazerLogin();
            });
        }

        if (document.getElementById('registerForm')) {
            document.getElementById('registerForm').addEventListener('submit', (e) => {
                e.preventDefault();
                this.fazerRegistro();
            });
        }

        const logoutButtons = document.querySelectorAll('[data-logout]');
        logoutButtons.forEach(button => {
            button.addEventListener('click', () => this.fazerLogout());
        });
    }

    async fazerLogin() {
        try {
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            const data = await window.apiService.login(email, senha);
            
            this.usuario = data.usuario;
            this.token = data.access_token;
            
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
            window.apiService.logout();
            
        } catch (error) {
            console.error('Erro durante logout:', error);
            localStorage.clear();
            window.location.href = 'login.html';
        }
    }

    getUsuarioLogado() {
        return this.usuario;
    }

    estaAutenticado() {
        return !!(this.token && this.usuario);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.apiService === 'undefined') {
        console.error('apiService não foi carregado! Certifique-se de carregar api.js primeiro.');
        return;
    }
    
    new BarbeariaApp();
});