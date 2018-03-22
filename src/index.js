// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const blockSockets = require('./api/sockets/block');
const socketIo = require('socket.io');
const http = require('http').Server(app);

// open mongoose connection
mongoose.connect();

const io = socketIo(http);
blockSockets(io);

// listen to requests
http.listen(port, () => console.info(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;
