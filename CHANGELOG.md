# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.
O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não publicado]

## [0.0.11] - 2025-02-23
### Adicionado
- Configuração do Bun como runtime padrão
- Scripts específicos para Bun no package.json
- Configurações de .gitignore para Bun
- Novas rotas para domínios e configurações
- Componentes para gerenciamento de domínios
- Configurações padrão do sistema
- Add server settings, domains, and system initialization
- Introduce server settings and domains database schemas
- Enhance system initialization with default network interface settings
- Update root API router to include domains and settings routers
- Add Toaster component to root layout
- Modify app sidebar with new domains and server settings navigation
- Update Nginx proxy configuration to support Drizzle Studio
- Adjust package.json files with version and script updates
- Remove console.log statements from system info components

### Alterado
- Atualização da URL do repositório para bytelabs-rocks
- Alteração da licença para Apache-2.0
- Migração dos scripts de npm para Bun

## [0.0.10] - 2025-02-15
### Adicionado
- Funcionalidade de cópia de endereço IP no componente de informações de rede
- Melhorias nos componentes de informação do sistema
- Suporte a host.docker.internal no Docker Compose

### Alterado
- Configuração do Nginx proxy para usar host.docker.internal
- Atualização dos componentes de informação de disco e rede
- Correção de permissões de arquivos

## [0.0.9] - 2025-02-12
### Adicionado
- Suporte à localização
- Sistema de assinaturas
- Componentes de informação do sistema refatorados
- Refatoração do dashboard
- Melhorias na interface do usuário

## [0.0.8] - 2025-02-11
### Adicionado
- Refatoração do router de setup para system router
- Implementação da recuperação de informações do sistema

## [0.0.7] - 2025-02-09
### Adicionado
- Funcionalidade de autenticação no dashboard
- Implementação do sign-out
- Layout do dashboard
- Router de autenticação
- Suporte inicial de configuração com UUID
- Sistema de roles de usuário
- Atualização do esquema de cores da sidebar
- Refatoração da página inicial e rota de login

### Removido
- Remoção da autenticação Discord
- Remoção do schema de posts

## [0.0.6] - 2025-02-09
### Adicionado
- Integração com Radix UI
- Melhorias na UI/UX
- Sistema de autenticação aprimorado
- Atualização das dependências do projeto
- Configuração do Tailwind

## [0.0.5] - 2025-02-09
### Adicionado
- Páginas de erro customizadas
- Atualização da configuração do Nginx

## [0.0.4] - 2025-02-08
### Adicionado
- Boilerplate do T3 app
- Estrutura antiga do projeto

## [0.0.3] - 2025-02-08
### Adicionado
- Configuração do Docker
- Ambiente de desenvolvimento
- Estrutura inicial do projeto

## [0.0.2] - 2025-02-08
### Adicionado
- Inicialização do repositório
- Configuração básica do projeto

## [0.0.1] - 2024-02-23
### Adicionado
- Versão inicial do projeto 
