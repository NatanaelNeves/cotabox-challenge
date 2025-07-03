const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Participant {
    id: ID!
    firstName: String!
    lastName: String!
    participation: Int!
  }

  type Query {
    getParticipants: [Participant]
  }

 type Mutation {
  addParticipant(firstName: String!, lastName: String!, participation: Int!): Participant
  resetData: String
}
`;

module.exports = typeDefs;