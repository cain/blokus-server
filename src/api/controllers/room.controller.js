const Room = require('../models/room.model');
const blocks = require('../utils/blocks');
const { roomFull, notFound } = require('../middlewares/error');

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
 * Join a roo
 * @public
 */
exports.join = async (req, res, next) => {
  try {
    const selectedRoom = await Room.findOne({ _id: req.params.id }, (err, room) => {
      if (err) {
        return notFound(req, res, next);
      }
    });

    if (!selectedRoom) {
      // doesn't exist
    }
    const { players } = selectedRoom;
    const userId = players[players.length - 1]._id
    if (players.length > 3 && players.indexOf(x => x._id === userId) === -1) {
      return roomFull(req, res, next);
    }
    await selectedRoom.players.push({
      team: blocks.teams[players.length],
    });
    await selectedRoom.save();
    return res.json({ room: selectedRoom, userId});
  } catch (e) {
    next(e);
  }
};
