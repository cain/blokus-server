const controller = require('../controllers/room.controller');

module.exports = function sockets(io) {
  io.on('connection', (socket) => {
    console.log('USER CONNECTED', socket.id);
    socket.emit('connected');

    socket.on('block_select', () => {

    });
    socket.on('block_move', (data) => {
      controller.moveBlock(data.roomId, data.block, data.userId).then((res) => {
        socket.broadcast.emit('blockMove', {
          block: res,
        });
      });
    });
  });
};
