# Plataforma Financeira de Criptomoeda

Projeto criado a partir de tutoriais no youtube com objetivo de aprender mais sobre a linguagem JavaScript e seus frameworks.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.


### 🔧 Instalação

* Faça uma cópia do repositório para sua maquina;
* Você vai precisar do docker instalado para rodar os containers (MongoDB e RabbitMQ);
* Após a instalação você deve abrir pelo terminal as pastas "candle-api" e "candle-generator" onde contém o docker-compose.yml, em ambas você irá executar o comando "docker-compose up" para que o docker possa baixar as imagens e criar os containers das respectivas;
  ```
  docker-compose up
  ```
* Acessando as 3 pastas do projeto pelo terminal, você irá executar o comando "npm install" para que o VS Code baixe os módulos e componentes necessários para a aplicação rodar;
* A aplicação utiliza PM2 para manter "candle-api" e "candle-generator" (back-end) rodando e atualizando sempre que houver mudança no código, para startar o pm2 em ambas, acesse as pastas via terminal e digite o comando "pm2 start pm2.json";
* Na pasta "bitcoin-candle-app" é o código do front-end feito com VueJS para inicializalo basta acessar a pasta via terminal no VS Code e digitar o comando "npm run serve";
* Se tudo ocorreu sem problemas basta acessar a aplicação pelo endereço localhost:8080


## 🛠️ Construído com:

* JavaSript
* NodeJS
* Express
* VueJS
* Docker
* Axios
* AMQPLIB
* Cors
* DotEnv
* Mongoose
* Socket.io
* Morgan
* PM2


## 🎁 Expressões de gratidão

* Obrigado Sidney Souza pelo vídeo tutorial no youtube.

---
