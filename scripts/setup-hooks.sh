#!/bin/bash

# Cria o diretório de scripts se não existir
mkdir -p scripts

# Copia os hooks para o diretório .git/hooks
cp .github/hooks/commit-msg .git/hooks/
cp .github/hooks/pre-push .git/hooks/

# Torna os hooks executáveis
chmod +x .git/hooks/commit-msg
chmod +x .git/hooks/pre-push

echo "Git hooks configurados com sucesso!" 