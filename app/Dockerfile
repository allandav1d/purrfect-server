# Use a imagem base oficial do Ubuntu
FROM ubuntu:latest

# Instale os pacotes necessários
RUN apt-get update && apt-get install -y \
    curl \
    unzip

# Instale o Bun
RUN curl -fsSL https://bun.sh/install | bash

# Adicione o Bun ao PATH
ENV PATH="/root/.bun/bin:${PATH}"

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e bun.lock
COPY package.json bun.lock ./

# Instale as dependências do projeto
RUN bun install

# Copie o restante do código do projeto
COPY . .

# Exponha a porta que o Next.js usa
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento
CMD ["bun", "dev"]
