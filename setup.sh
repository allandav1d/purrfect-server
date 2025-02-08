#!/bin/bash

# Função para instalar o Git se não estiver instalado
install_git() {
  if ! command -v git &> /dev/null
  then
    echo "Git could not be found. Installing Git..."
    sudo apt-get update
    sudo apt-get install -y git
  else
    echo "Git is already installed"
  fi
}

# Função para instalar o Docker se não estiver instalado
install_docker() {
  if ! command -v docker &> /dev/null
  then
    echo "Docker could not be found. Installing Docker..."
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce
    sudo systemctl start docker
    sudo systemctl enable docker
  else
    echo "Docker is already installed"
  fi
}

# Função para docker-compose se não estiver instalado
install_docker_compose() {
  if ! command -v docker-compose &> /dev/null
  then
    echo "Docker Compose could not be found. Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
  else
    echo "Docker Compose is already installed"
  fi
}

# Função para clonar o repositório
clone_repo() {
  REPO_URL="https://github.com/allandav1d/purrfect-server.git"
  if [ ! -d "purrfect-server" ]; then
    echo "Cloning repository..."
    git clone $REPO_URL
    cd purrfect-server
  else
    echo "Repository already cloned"
    cd purrfect-server
  fi
}

# Função para configurar Docker Compose
setup_docker_compose() {
  docker-compose up --build
}

# Executar funções
install_git
install_docker
install_docker_compose
clone_repo
setup_docker_compose
