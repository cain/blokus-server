function sockets(io) {
  io.on('connection', (socket) => {
    console.log('USER CONNECTED', socket.id);
    socket.emit('connected');

    socket.on('block_select', (data) => {
      console.log('block move', data.block);
    });
    socket.on('block_move', (data) => {
      console.log('block move', data.block._id);
      socket.broadcast.emit('blockMove', {
        block: data.block,
      });
    });
  });
}

module.exports = sockets;
