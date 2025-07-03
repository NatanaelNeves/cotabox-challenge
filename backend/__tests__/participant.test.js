const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('../src/graphql/typeDefs');
const resolvers = require('../src/graphql/resolvers');
const Participant = require('../src/models/Participant');

// Cria um servidor de teste
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Passamos o Model para o contexto para que os resolvers o acessem
  context: () => ({ Participant }), 
});

// Conexão com o banco de dados em memória
beforeAll(async () => {
  // As opções useNewUrlParser e useUnifiedTopology foram removidas pois são obsoletas
  await mongoose.connect(process.env.MONGO_URL);
});

// Desconectar depois de todos os testes
afterAll(async () => {
  await mongoose.connection.close();
});

// Limpar o banco depois de cada teste
afterEach(async () => {
  await Participant.deleteMany({});
});


describe('Participant Mutations', () => {

  // Teste de Sucesso
  it('should add a participant successfully', async () => {
    const ADD_PARTICIPANT_MUTATION = `
      mutation AddParticipant($firstName: String!, $lastName: String!, $participation: Int!) {
        addParticipant(firstName: $firstName, lastName: $lastName, participation: $participation) {
          firstName
          participation
        }
      }
    `;

    const response = await server.executeOperation({
      query: ADD_PARTICIPANT_MUTATION,
      variables: { firstName: "John", lastName: "Doe", participation: 20 },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data.addParticipant).toBeDefined();
    expect(response.data.addParticipant.firstName).toBe('John');
    expect(response.data.addParticipant.participation).toBe(20);
  });

  // Teste de Erro (ultrapassando 100%)
  it('should return an error if total participation exceeds 100', async () => {
    // Primeiro, adicionamos um participante com 90%
    await new Participant({ firstName: 'Jane', lastName: 'Doe', participation: 90 }).save();

    const ADD_ANOTHER_PARTICIPANT_MUTATION = `
      mutation AddAnotherParticipant($firstName: String!, $lastName: String!, $participation: Int!) {
        addParticipant(firstName: $firstName, lastName: $lastName, participation: $participation) {
          id
        }
      }
    `;

    const response = await server.executeOperation({
      query: ADD_ANOTHER_PARTICIPANT_MUTATION,
      variables: { firstName: "Jim", lastName: "Beam", participation: 15 },
    });

    // Esperamos que a resposta contenha um erro
    // A correção está aqui: checamos se o campo da mutação é nulo
    expect(response.data.addParticipant).toBeNull(); 
    expect(response.errors).toBeDefined();
    expect(response.errors[0].message).toContain('A participação total excederia 100%');
  });
});
