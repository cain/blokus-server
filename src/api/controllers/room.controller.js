const Room = require('../models/room.model');
const blocks = require('../utils/blocks');
const { roomFull, notFound } = require('../middlewares/error');

/**
 * Get room with id
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const selectedRoom = await Room.findOne({ _id: req.params.id }, (err, room) => {
      if (err) {
        return notFound(req, res, next);
      }
      return room;
    });
    return res.json({ blocks: selectedRoom.blocks });
  } catch (e) {
    return next(e);
  }
};
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
      return room;
    });
    const { players } = selectedRoom;
    const { userId } = req.query;

    // if userId is sent, and is already a player
    if (userId && players.find(x => `${x._id}` === userId)) {
      return res.json({ room: selectedRoom });
    }

    // room only allows 4 players
    if (players.length > 3) {
      return roomFull(req, res, next);
    }

    // add the new player
    await selectedRoom.players.push({
      team: blocks.teams[players.length],
    });

    // push new player blocks into room
    await selectedRoom.blocks.push(
      ...blocks.createBlocks(selectedRoom.players[selectedRoom.players.length - 1].team),
    );
    await selectedRoom.save();
    return res.json({ room: selectedRoom, userId: players[players.length - 1]._id });
  } catch (e) {
    return next(e);
  }
};
