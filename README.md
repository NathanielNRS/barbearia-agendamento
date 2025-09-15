# 💈 Barbearia Agendamento - MVP

Sistema de agendamento para barbearia desenvolvido como MVP (Minimum Viable Product) para gerenciar clientes, serviços, barbeiros e agendamentos.

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **TypeORM** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação por tokens
- **class-validator** - Validação de dados

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização
- **JavaScript (ES6+)** - Funcionalidades
- **Fetch API** - Comunicação com backend

## 📦 Funcionalidades

### ✅ Implementadas
- **Autenticação de usuários** (registro e login)
- **CRUD de serviços** da barbearia
- **CRUD de barbeiros**
- **Sistema de agendamentos** com horários disponíveis
- **Gestão de usuários**

### 🔄 Em Desenvolvimento
- Painel administrativo
- Notificações por e-mail
- Sistema de pagamentos integrado

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (v18 ou superior)
- PostgreSQL
- npm ou yarn

### Backend
```bash
# Clone o repositório
git clone https://github.com/nathanielrissi/barbearia-agendamento.git

# Acesse a pasta do backend
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações de banco

# Execute as migrations
npm run typeorm migration:run

# Inicie o servidor
npm run start:dev
```

### Frontend
```bash
# Acesse a pasta do frontend
cd frontend

# Sirva os arquivos estáticos
# Use um servidor local como Live Server ou:
python -m http.server 8000
```

## 🌐 API Endpoints

### Autenticação
- `POST /auth/registrar` - Registrar novo usuário
- `POST /auth/login` - Login de usuário

### Serviços
- `GET /api/servicos` - Listar todos os serviços
- `POST /api/servicos` - Criar novo serviço (admin)

### Barbeiros
- `GET /api/barbeiros` - Listar barbeiros disponíveis
- `POST /api/barbeiros` - Adicionar barbeiro (admin)

### Agendamentos
- `GET /api/agendamentos` - Listar agendamentos do usuário
- `POST /api/agendamentos` - Criar novo agendamento
- `DELETE /api/agendamentos/:id` - Cancelar agendamento

## 🗂️ Estrutura do Projeto

```
src/
├── agendamentos/          # Entidade e lógica de agendamentos
├── auth/                  # Autenticação e JWT
├── barbeiros/             # Gestão de barbeiros
├── services/              # Serviços da barbearia
├── usuarios/              # Gestão de usuários
├── app.module.ts          # Módulo principal
└── main.ts                # Ponto de entrada
```

## 👨‍💻 Desenvolvedor

**Nathaniel Nicolas Rissi Soares**  
- Desenvolvedor Full Stack
- Especializado em HTML e Python
- Entusiasta de arquitetura de software

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

