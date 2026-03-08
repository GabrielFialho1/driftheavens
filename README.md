# HeavensDrift - Sistema de Gerenciamento de Servidor de Drift

Plataforma web para gerenciamento de comunidades de drift online. Sistema construído com Next.js para administrar torneios, marketplace de veículos, perfis de usuários e agendamento de eventos.

## Funcionalidades Principais

### Sistema de Torneios
- Agendamento automático de eventos de drift
- Sistema de inscrições com gerenciamento de participantes
- Rankings e pontuações em tempo real
- Histórico de torneios e resultados anteriores

### Marketplace Integrado
- Compra e venda de veículos entre usuários
- Sistema de listagens com preços definidos
- Gestão de inventário pessoal de veículos
- Transações dentro da plataforma

### Gestão de Perfis
- Perfis personalizáveis com avatares e estatísticas
- Sistema de XP e níveis de experiência
- Histórico de participações em torneios
- Estatísticas detalhadas de desempenho

### Sistema de Agendamento
- Calendário de eventos integrado
- Notificações automáticas de próximos torneios
- Inscrições simplificadas
- Gestão de vagas e limites de participantes

## Stack Tecnológico

- **Frontend**: Next.js 16.1.6 com React 19.2.3
- **Estilização**: TailwindCSS 4.0
- **Linguagem**: TypeScript 5
- **Banco de Dados**: MySQL com mysql2
- **Autenticação**: JWT (JSON Web Tokens)
- **Validação**: Schemas de validação customizados

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** como gerenciador de pacotes
- **MySQL** (versão 8.0 ou superior)
- **Git** para controle de versão

## Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone https://github.com/GabrielFialho1/driftheavens.git
cd driftheavens
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Banco de Dados
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"

# Autenticação
JWT_SECRET="sua-chave-secreta-super-forte-aqui"
NEXTAUTH_SECRET="sua-chave-nextauth-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Configurações do Servidor
PORT=3000
NODE_ENV="development"
```

### 4. Configurar Banco de Dados

```bash
# Conecte-se ao MySQL e crie o banco
mysql -u root -p
CREATE DATABASE driftheavens;
```

Execute as migrações (se houver arquivo de migração):

```bash
npm run db:migrate
# ou execute manualmente o SQL em lib/database.ts
```

### 5. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em **http://localhost:3000**

## Estrutura do Projeto

```
driftheavens/
# Páginas e componentes do Next.js
# Componentes reutilizáveis
# Estilos globais
# Layout principal
# Página inicial
# Componentes compartilhados
# Contextos do React (Auth, Notifications)
# Utilitários e configurações
# Lógica de autenticação
# Conexão com banco de dados
# Gestão de torneios
# Sistema de marketplace
# Gestão de usuários
# Definições de tipos TypeScript
# Arquivos estáticos
# Imagens (avatars, carros, etc.)
# Ícones da aplicação
# Hooks personalizados do React
```

## Como Usar a Aplicação

### Para Administradores

1. **Acesse**: `http://localhost:3000`
2. **Crie torneios** através do painel administrativo
3. **Gerencie participantes** e inscrições
4. **Monitore o marketplace** e transações

### Para Jogadores

1. **Registre-se** na plataforma
2. **Complete seu perfil** com avatar e informações
3. **Inscreva-se** em torneios disponíveis
4. **Compre e venda** veículos no marketplace
5. **Acompanhe seu progresso** e estatísticas

## Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Iniciar servidor de produção
npm start

# Verificar código com ESLint
npm run lint

# Executar testes (se configurados)
npm test
```

## Configuração Avançada

### Variáveis de Ambiente Opcionais

```env
# Configurações de Email (para notificações)
SMTP_HOST="smtp.seu-provedor.com"
SMTP_PORT=587
SMTP_USER="seu-email@dominio.com"
SMTP_PASS="sua-senha"

# Configurações de Upload
MAX_FILE_SIZE=5242880  # 5MB
UPLOAD_DIR="./uploads"

# Configurações de Cache
REDIS_URL="redis://localhost:6379"
CACHE_TTL=3600
```

### Configuração de Produção

1. **Construa a aplicação**:
   ```bash
   npm run build
   ```

2. **Configure variáveis de produção** no servidor

3. **Inicie com PM2** (recomendado):
   ```bash
   npm install -g pm2
   pm2 start npm --name "driftheavens" -- start
   ```

## Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no painel
3. Deploy automático em cada push para `main`

### Docker

```bash
# Construir imagem
docker build -t driftheavens .

# Executar container
docker run -p 3000:3000 driftheavens
```

## Como Contribuir

1. **Fork** este repositório
2. **Crie uma branch** para sua feature: `git checkout -b feature/nova-funcionalidade`
3. **Commit suas mudanças**: `git commit -m 'Adiciona nova funcionalidade'`
4. **Push para a branch**: `git push origin feature/nova-funcionalidade`
5. **Abra um Pull Request**

## Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Troubleshooting

### Problemas Comuns

**Erro de conexão com banco de dados:**
- Verifique se o MySQL está rodando
- Confirme as credenciais no `.env.local`
- Certifique-se que o banco de dados existe

**Erro de build:**
- Limpe o cache: `rm -rf .next`
- Reinstale dependências: `rm -rf node_modules && npm install`

**Autenticação não funciona:**
- Verifique se `JWT_SECRET` está configurado
- Confirme que `NEXTAUTH_URL` corresponde ao seu domínio

### Suporte

- Email: suporte@driftheavens.com
- Discord: [Link para servidor de suporte]
- Issues: [Abra uma issue no GitHub]

---

## Informações

Sistema desenvolvido para gestão de comunidades e torneios de drift, proporcionando ambiente controlado para organização de eventos e transações entre participantes.

**HeavensDrift** - Plataforma de gerenciamento para comunidades de drift.
