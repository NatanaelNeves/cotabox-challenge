require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./config/database'); // 1. Importe o módulo

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectDB(); // 2. Execute a conexão aqui

  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
    console.log(`🚀 GraphQL Playground em http://localhost:${PORT}/graphql`);
  });
}

startServer();