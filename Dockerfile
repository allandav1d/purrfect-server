# Use a imagem base oficial do Bun
FROM bun:latest

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e todas as dependências
COPY package.json bun.lock ./

# Instale as dependências do projeto
RUN bun install

# Copie o restante do código do projeto
COPY . .

# Exponha a porta que o Next.js usa
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento
CMD ["bun", "dev"]
