    # Usamos uma imagem oficial do Node.js como base. A versão 16 é ótima e estável.
    FROM node:16-alpine

    # Definimos o diretório de trabalho dentro do container
    WORKDIR /app

    # Copiamos os arquivos de dependência primeiro para aproveitar o cache do Docker
    COPY backend/package*.json ./

    # Instalamos as dependências
    RUN npm install

    # Copiamos o resto do código da nossa aplicação para dentro do container
    COPY . .

    # Expomos a porta 4000, que é a porta que nosso servidor usa
    EXPOSE 4000

    # O comando que será executado quando o container iniciar
    CMD ["npm", "run", "dev"]
    