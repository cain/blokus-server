const Room = require('../models/room.model');
const blocks = require('../utils/blocks');

/**
 * Create a new room
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const newRoom = new Room({
      name: req.body.roomName,
      players: [
        {
          team: blocks.teams[0],
        },
      ],
      blocks: blocks.createBlocks(blocks.teams[0]),
    });
    await newRoom.save();
    const { players } = newRoom;
    res.json({ room: newRoom, userId: players[players.length - 1]._id });
  } catch (e) {
    next(e);
  }
};


/**
 * Join a room
 * @public
 */
exports.join = async (req, res, next) => {
  try {
    const selectedRoom = await Room.findOne({ _id: req.params.id });

    if (!selectedRoom) {
      // doesn't exist
    }
    const { players } = selectedRoom;
    if (players.length === 4) {
      // its full
    }
    await selectedRoom.players.push({
      team: blocks.teams[players.length],
    });
    await selectedRoom.save();
    res.json({ room: selectedRoom, userId: players[players.length - 1]._id });
  } catch (e) {
    next(e);
  }
};
