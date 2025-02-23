#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Configurando Git hooks...${NC}"

# Cria o diretório de hooks se não existir
mkdir -p .git/hooks

# Lista de hooks para copiar
HOOKS=(
    "pre-commit"
    "pre-push"
)

# Copia cada hook e torna executável
for hook in "${HOOKS[@]}"; do
    echo -e "${YELLOW}Instalando $hook...${NC}"
    cp .github/hooks/$hook .git/hooks/
    chmod +x .git/hooks/$hook
    echo -e "${GREEN}✓ $hook instalado${NC}"
done

echo -e "${GREEN}Git hooks configurados com sucesso!${NC}" 