FROM node:16-alpine

WORKDIR /app

# Copia apenas os arquivos de dependência do backend
COPY backend/package*.json ./

# Instala as dependências
RUN npm install

# Copia o código do backend
COPY backend/ ./

# Expõe a porta usada pela API
EXPOSE 4000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
