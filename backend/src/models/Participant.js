const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  participation: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Participant', participantSchema);