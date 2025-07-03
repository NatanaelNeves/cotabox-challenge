require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors'); 
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectDB();

  const app = express();

  app.use(cors());

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
