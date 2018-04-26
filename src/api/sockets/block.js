const controller = require('../controllers/room.controller');

module.exports = function sockets(io) {
  io.on('connection', (socket) => {
    socket.emit('connected');

    socket.on('block_select', () => {});

    socket.on('block_move', (data) => {
      controller.moveBlock(data.roomId, data.block, data.userId).then((res) => {
        socket.broadcast.emit('blockMove', {
          block: res,
        });
      });
    });

    socket.on('block_edit', (data) => {
      console.log('block edit')
      controller.editBlock(data.roomId, data.block, data.userId).then((res) => {
        socket.broadcast.emit('blockEdit', {
          block: res,
        });
      });
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
