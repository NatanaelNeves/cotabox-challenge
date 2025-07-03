const { UserInputError } = require('apollo-server-express');
const Participant = require('../models/Participant');

const resolvers = {
  Query: {
    getParticipants: async () => {
      try {
        const participants = await Participant.find({});
        return participants;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    addParticipant: async (_, { firstName, lastName, participation }) => {
      const participants = await Participant.find({});
      const currentTotal = participants.reduce((sum, p) => sum + p.participation, 0);

      if (currentTotal + participation > 100) {
        throw new UserInputError(
          `A participação total excederia 100%. (Disponível: ${100 - currentTotal}%)`
        );
      }

      const newParticipant = new Participant({
        firstName,
        lastName,
        participation,
      });

      try {
        const savedParticipant = await newParticipant.save();
        return savedParticipant;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: Object.keys(err.errors),
        });
      }
    }, 

    resetData: async () => {
      try {
        await Participant.deleteMany({});
        return "Dados resetados com sucesso!";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = resolvers;
