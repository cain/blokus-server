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
 * Get ALL rooms
 * @public
 */
exports.getAll = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    return res.json({ rooms });
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
exports.join = async (roomId, userId) => {
  try {
    const selectedRoom = await Room.findOne({ _id: roomId }, (err, room) => {
      if (err) {
        console.log(err)
        // return notFound(req, res, next);
      }
      return room;
    });
    const { players } = selectedRoom;
    const player = userId && players.find(x => `${x._id}` === userId);
    // const { userId } = req.query;

    // if userId is sent, and is already a player
    if (player) {
      // return res.json({ room: selectedRoom, player: players.find(x => `${x._id}` === userId) });
      if (player.team) return { room: selectedRoom, player, status: 'joined' };
      return { room: selectedRoom, player, status: 'select' };
    }
    // add the new player
    // await selectedRoom.players.push({
    // });

    await selectedRoom.save();
    return { room: selectedRoom, player: selectedRoom.players.slice(-1).pop(), status: 'select' };
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

/**
 * Move a block in a room
 * @public
 */
exports.moveBlock = async (roomId, blockMoved, userId) => {
  try {
    const selectedRoom = await Room.findOne({ _id: roomId }, (err, room) => {
      if (err) {
        throw new Error(err);
      }
      return room;
    });
    const { players } = selectedRoom;
    // if userId is sent, and is already a player
    if (!players.find(x => `${x._id}` === userId)) {
      // do something
    }

    // find block thats changed and change the values
    const blockIndex = selectedRoom.blocks.findIndex(x => `${x._id}` === blockMoved._id);
    const { x, y } = blockMoved;
    selectedRoom.blocks[blockIndex].x = x;
    selectedRoom.blocks[blockIndex].y = y;

    await selectedRoom.save();
    return selectedRoom.blocks[blockIndex];
  } catch (e) {
    // do something
    return '';
  }
};

/**
 * Player selection (nickname, team)
 * @public
 */
exports.playerSelect = async (roomId, userId, team, nickname) => {
  try {
    const selectedRoom = await Room.findOne({ _id: roomId }, (err, room) => {
      if (err) {
        throw new Error(err);
      }
      return room;
    });
    const { players } = selectedRoom;
    const player = players.find(x => `${x._id}` === userId);

    if (!team || !nickname) throw new Error('Select a team or name');
    console.log(nickname, team, players);
    if (players.find(x => `${x.team}` === team) || players.find(x => `${x.name}` === nickname)) {
      throw new Error('Name or team is in use');
    }

    // enter team name
    player.name = nickname;
    player.team = blocks.teams[team];
    // push new player blocks into room
    await selectedRoom.blocks.push(
      ...blocks.createBlocks(player.team),
    );
    await selectedRoom.save();

    return { room: selectedRoom, player, players };
  } catch (e) {
    // do something
    console.log('ERROR', e);
    return '';
  }
};

/**
 * Edit a block in a room (flip, rotate)
 * @public
 */
exports.editBlock = async (roomId, editedBlock, userId) => {
  try {
    const selectedRoom = await Room.findOne({ _id: roomId }, (err, room) => {
      if (err) {
        // do something
      }
      return room;
    });

    // find block thats changed and change the values
    const blockIndex = selectedRoom.blocks.findIndex(x => `${x._id}` === editedBlock._id);
    selectedRoom.blocks[blockIndex] = editedBlock;

    await selectedRoom.save();
    return selectedRoom.blocks[blockIndex];
  } catch (e) {
    // do something
    return '';
  }
};
