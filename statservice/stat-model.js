const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  right: {
    type: Boolean,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;
