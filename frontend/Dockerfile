    # Usamos a mesma imagem base do Node.js
    FROM node:16-alpine

    # Definimos o diretório de trabalho
    WORKDIR /app

    # Copiamos os arquivos de dependência
    COPY package*.json ./

    # Instalamos as dependências
    RUN npm install

    # Copiamos o resto do código do frontend
    COPY . .

    # Expomos a porta 8080, que é a porta padrão do servidor de desenvolvimento do Vue
    EXPOSE 8080

    # O comando para iniciar o servidor de desenvolvimento do Vue
    CMD ["npm", "run", "serve"]
    