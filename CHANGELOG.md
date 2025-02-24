# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.
O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).
## [Não publicado]

### Alterado
- Clean up imports and remove unused code across multiple components

- Remove unnecessary imports from various files
- Replace `||` with nullish coalescing operator `??`
- Remove commented-out code and unused variables
- Simplify error handling in login forms
- Optimize type handling and null checks
## [0.0.32] - 2025-02-24
- Add domain validation with regex and error handling
- Add input validation for domain entry
### Adicionado
- Adjust table content padding
### Alterado
- Commented out unused DNS status column
- **domains**: Enhance domain management with validation and confirmation
- **domains**: Simplify domain table layout and remove unused columns
- Implement domain deletion confirmation dialog
- Improve UI with breadcrumbs and tutorial dialog
- Refactor domain management page layout and interactions
- Remove DNS Reverso column from domains table
- Update README to mark simple domain management as completed
## [0.0.28] - 2025-02-23
- Add `check_sync()` function to improve remote branch synchronization logic
- Add final synchronization verification before push
- **hooks**: Enhance pre-push synchronization checks
- Implement detailed branch status checks with color-coded output
- Improve error handling for branch synchronization scenarios
## [0.0.26] - 2025-02-23
- Add unique sorting to unpublished content extraction
- **hooks**: Optimize changelog deduplication and sorting
- Implement deduplication of changelog entries during version update
- Improve changelog management to prevent duplicate entries
## [0.0.24] - 2025-02-23
- Atualização de versão para 0.0.24
## [0.0.22] - 2025-02-23
- Atualização de versão para 0.0.22
## [0.0.20] - 2025-02-23
- **hooks**: Simplify changelog version update logic
- Modify pre-push hook to streamline changelog version synchronization
- Improve version insertion with default entry when no unpublished content exists
- Optimize changelog update process with clearer version handling
- Ensure consistent changelog formatting for version updates
## [0.0.19] - 2025-02-23
## [0.0.18] - 2025-02-23
- **hooks**: Improve changelog version synchronization logic
- Enhance pre-push hook to check and sync package.json and CHANGELOG.md versions
- Add more robust version detection and handling
- Optimize changelog update process with conditional version insertion
- Improve error handling and output messaging
## [0.0.15] - 2025-02-23
- Add Copyable component for IP address copying
- Implement Copyable component for easy IP address copying
- Replace manual clipboard handling with reusable Copyable component
- Update domains and network info pages to use new Copyable component
- Remove console.log statements from domains router
- Enhance user experience with consistent IP address copying functionality
## [0.0.14] - 2025-02-23
- **hooks**: Improve changelog management in pre-push hook
- Enhance changelog update logic to automatically move unpublished changes
- Add version and date detection for changelog entries
- Implement automatic changelog formatting and version synchronization
## [0.0.13] - 2025-02-23
- **hooks**: Enhance pre-push hook with advanced remote synchronization
- Improve remote branch synchronization checks
- Add automatic rebase and stash handling
- Implement detailed error messages and recovery guidance
- Enhance console output with color-coded status indicators
## [0.0.12] - 2025-02-23
- **hooks**: Add comprehensive pre-commit and pre-push Git hooks
- Implement pre-commit hook with version and changelog management
- Create pre-push hook to validate changelog and version synchronization
- Update setup-hooks.sh script to support multiple hooks installation
- Add color-coded output and detailed validation checks
## [0.0.11] - 2025-02-23
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
- Atualização da URL do repositório para bytelabs-rocks
- Alteração da licença para Apache-2.0
- Migração dos scripts de npm para Bun
## [0.0.10] - 2025-02-15
- Funcionalidade de cópia de endereço IP no componente de informações de rede
- Melhorias nos componentes de informação do sistema
- Suporte a host.docker.internal no Docker Compose
- Configuração do Nginx proxy para usar host.docker.internal
- Atualização dos componentes de informação de disco e rede
- Correção de permissões de arquivos
## [0.0.9] - 2025-02-12
- Suporte à localização
- Sistema de assinaturas
- Componentes de informação do sistema refatorados
- Refatoração do dashboard
- Melhorias na interface do usuário
## [0.0.8] - 2025-02-11
- Refatoração do router de setup para system router
- Implementação da recuperação de informações do sistema
## [0.0.7] - 2025-02-09
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
- Integração com Radix UI
- Melhorias na UI/UX
- Sistema de autenticação aprimorado
- Atualização das dependências do projeto
- Configuração do Tailwind
## [0.0.5] - 2025-02-09
- Páginas de erro customizadas
- Atualização da configuração do Nginx
## [0.0.4] - 2025-02-08
- Boilerplate do T3 app
- Estrutura antiga do projeto
## [0.0.3] - 2025-02-08
- Configuração do Docker
- Ambiente de desenvolvimento
- Estrutura inicial do projeto
## [0.0.2] - 2025-02-08
- Inicialização do repositório
- Configuração básica do projeto
## [0.0.1] - 2024-02-23
- Versão inicial do projeto 
