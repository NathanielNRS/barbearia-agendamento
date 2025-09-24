# 💈 Barbearia Style - Sistema de Agendamentos

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![XAMPP](https://img.shields.io/badge/XAMPP-FB7A24?style=for-the-badge&logo=xampp&logoColor=white)

Sistema completo de agendamento para barbearia desenvolvido com **NestJS + MySQL + JavaScript Vanilla**. Permite que clientes agendem horários com barbeiros específicos de forma intuitiva e eficiente.

## 🎯 Objetivo do Projeto

Criar uma solução completa para gestão de agendamentos em barbearias, oferecendo:
- ✅ Agendamento online intuitivo para clientes
- ✅ Gestão de barbeiros e serviços
- ✅ Controle de horários disponíveis em tempo real
- ✅ Interface responsiva e user-friendly
- ✅ Sistema de autenticação seguro

## ✨ Funcionalidades Principais

- **👤 Autenticação de Usuários** - Registro e login com JWT
- **📅 Agendamentos** - Criar, visualizar e cancelar agendamentos
- **💇 Gestão de Barbeiros** - Cadastro e listagem de profissionais
- **✂️ Serviços** - Catálogo de serviços com preços
- **🕒 Horários Disponíveis** - Visualização em tempo real
- **📱 Interface Responsiva** - Funciona em desktop e mobile

## 🏗️ Arquitetura do Projeto

```
barbearia-agendamento/
├── 📁 backend/          # API NestJS
├── 📁 frontend/         # Interface web
└── 📄 README.md
```

### **Backend (NestJS)**
- **Framework**: NestJS 9.0+
- **ORM**: TypeORM
- **Banco**: MySQL 8.0+
- **Autenticação**: JWT
- **Porta**: 3001

### **Frontend (Vanilla JS)**
- **Tecnologia**: JavaScript ES6+
- **UI**: Bootstrap 5.3+
- **HTTP Client**: Fetch API
- **Porta**: 3000

### **Banco de Dados**
- **SGBD**: MySQL (XAMPP)
- **Porta**: 3306
- **Charset**: utf8mb4

## 🚀 Começando

### Pré-requisitos

- **Node.js** 16+ [Download](https://nodejs.org/)
- **XAMPP** [Download](https://www.apachefriends.org/)
- **Git** [Download](https://git-scm.com/)

### Instalação Rápida

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/barbearia-agendamento.git
cd barbearia-agendamento
```

2. **Configure o XAMPP**
- Inicie o XAMPP
- Start nos serviços **Apache** e **MySQL**
- Acesse `http://localhost/phpmyadmin`

3. **Configure o Banco de Dados**
```sql
CREATE DATABASE barbearia_db;
USE barbearia_db;
```

4. **Backend Setup**
```bash
cd backend
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações
```

5. **Frontend Setup**
```bash
cd frontend
# Os arquivos HTML/JS/CSS já estão prontos
# Sirva com um servidor HTTP simples
```

### Configuração do Ambiente

**Arquivo `.env` (backend/.env)**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=barbearia_db
JWT_SECRET=sua_chave_secreta_aqui
```

### Executando a Aplicação

1. **Inicie o Backend**
```bash
cd backend
npm run start:dev
# Servidor rodando em http://localhost:3001
```

2. **Inicie o Frontend**
```bash
cd frontend
# Use o Live Server do VSCode ou:
npx http-server -p 3000
# Acesse http://localhost:3000
```

3. **Acesse a Aplicação**
- Frontend: `http://localhost:3000`
- API: `http://localhost:3001`
- phpMyAdmin: `http://localhost/phpmyadmin`

## 📚 Estrutura do Banco de Dados

### Tabelas Principais

```sql
-- Usuários do sistema
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Barbeiros cadastrados
CREATE TABLE barbeiro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    especialidades TEXT
);

-- Serviços oferecidos
CREATE TABLE servico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    duracao INT NOT NULL
);

-- Agendamentos dos clientes
CREATE TABLE agendamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    barbeiro_id INT NOT NULL,
    servico_id INT NOT NULL,
    data_agendamento DATE NOT NULL,
    horario VARCHAR(5) NOT NULL,
    status ENUM('confirmado','pendente','cancelado','concluido') DEFAULT 'confirmado',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (barbeiro_id) REFERENCES barbeiro(id),
    FOREIGN KEY (servico_id) REFERENCES servico(id)
);
```

## 🔌 API Reference

### Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/login` | Login de usuário |
| `POST` | `/auth/registrar` | Registrar novo usuário |

### Agendamentos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/agendamentos/meus` | Listar agendamentos do usuário |
| `POST` | `/api/agendamentos` | Criar novo agendamento |
| `PUT` | `/api/agendamentos/:id/cancelar` | Cancelar agendamento |

### Barbeiros & Serviços
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/barbeiros` | Listar barbeiros |
| `GET` | `/api/servicos` | Listar serviços |
| `GET` | `/api/agendamentos/horarios` | Horários disponíveis |

**Exemplo de Uso:**
```javascript
// Criar agendamento
const response = await fetch('/api/agendamentos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        barbeiro_id: 1,
        servico_id: 1,
        data_agendamento: '2024-01-20',
        horario: '10:00'
    })
});
```

## 🎨 Interface do Usuário

### Páginas Disponíveis

- **`/index.html`** - Página inicial
- **`/login.html`** - Autenticação
- **`/register.html`** - Cadastro de usuário
- **`/agendamentos.html`** - Gestão de agendamentos

### Fluxo do Usuário

1. **Cadastro/Login** → Acessa sistema
2. **Seleciona Barbeiro** → Escolhe profissional
3. **Escolhe Serviço** → Define corte/barba
4. **Seleciona Data/Horário** → Agenda conforme disponibilidade
5. **Confirma** → Recebe confirmação do agendamento

## 🐛 Troubleshooting

### Problemas Comuns

**Erro de Conexão com MySQL**
```bash
# Verificar se XAMPP está rodando
# Conferir credenciais no .env
# Testar conexão via DBeaver/phpMyAdmin
```

**Problemas de CORS**
```bash
# Verificar se frontend está na porta 3000
# Confirmar configuração CORS no backend
```

**Token Expirado**
```bash
# Fazer logout e login novamente
# Verificar expiração do JWT no backend
```

### Comandos Úteis

```bash
# Verificar status dos serviços
netstat -an | findstr :3001
netstat -an | findstr :3306

# Limpar cache de autenticação
localStorage.clear()

# Reiniciar aplicação
# 1. Parar backend (Ctrl+C)
# 2. Parar XAMPP
# 3. Iniciar XAMPP
# 4. Iniciar backend
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

**Tecnologias Utilizadas:**
- [NestJS](https://nestjs.com/) - Framework backend
- [MySQL](https://www.mysql.com/) - Banco de dados
- [Bootstrap](https://getbootstrap.com/) - Framework CSS
- [XAMPP](https://www.apachefriends.org/) - Ambiente de desenvolvimento

---

## 📞 Suporte

Encontrou problemas? 

1. Verifique a seção de Troubleshooting acima
2. Confirme se todas as dependências estão instaladas
3. Verifique os logs no console do navegador e terminal do backend

**Links Úteis:**
- [Documentação NestJS](https://docs.nestjs.com/)
- [Documentação MySQL](https://dev.mysql.com/doc/)
- [Documentação Bootstrap](https://getbootstrap.com/docs/)

