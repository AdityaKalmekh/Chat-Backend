'use strict';

const socket = require('./socket');
const { Server } = require('socket.io'); // Correct import for socket.io

module.exports = async ({ strapi }) => {
  const io = new Server(strapi.server.httpServer, {
    cors: {
      origin: 'http://localhost:3000', // your frontend URL
      methods: ['GET', 'POST'],
    },
  });

  strapi.io = io; // register socket to strapi
  socket(io);
};
