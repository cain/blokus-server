const mongoose = require('mongoose');
const blocks = require('../utils/blocks');

const teams = ['RED', 'GREEN', 'BLUE', 'YELLOW'];

const player = new mongoose.Schema({
  userId: {
    type: String,
    index: true,
    unique: true,
  },
  team: {
    type: String,
    index: true,
    unique: true,
    enum: teams,
  },
});

const block = new mongoose.Schema({
  id: String,
  grid: Object,
  pieces: [Object],
  x: Number,
  y: Number,
  team: {
    type: String,
    enum: teams,
  },
});

/**
 * Room Schema
 * @private
 */
const roomSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId(),
  players: [player],
  blocks: [block],
});

roomSchema.statics = {

  /**
   * Generate a refresh token object and saves it into the database
   *
   * @param UserId
   * @returns {Room}
   */
  generateRoom(userId) {
    const newRoom = new Room({
      players: [
        {
          userId,
          team: teams[0],
        },
      ],
      blocks: blocks(teams),
    });
    newRoom.save();
    return newRoom;
  },

};


const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
