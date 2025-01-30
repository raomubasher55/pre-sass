// socket.js
const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
  io = socketIo(server); // Initialize socket.io with the server instance
};

const getSocket = () => io;

module.exports = { initSocket, getSocket };
