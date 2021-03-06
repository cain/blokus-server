const mongoose = require('mongoose');
const blocks = require('../utils/blocks');

const player = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  socketId: {
    type: String,
  },
  team: {
    type: String,
    enum: blocks.teams,
  },
}, { timestamps: true });

const block = new mongoose.Schema({
  grid: Object,
  pieces: Array,
  x: Number,
  y: Number,
  team: {
    type: String,
    enum: blocks.teams,
  },
});

/**
 * Room Schema
 * @private
 */
const roomSchema = new mongoose.Schema(
  {
    name: String,
    players: [player],
    blocks: [block],
  },
  {
    timestamps: true,
  });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
