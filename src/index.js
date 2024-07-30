'use strict';

const { Server } = require('socket.io');
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
        methods: ["GET", "POST"],
        credentials : true
      }
    });

    io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        const { id } = await strapi.plugins['users-permissions'].services.jwt.verify(token);
        const user = await strapi.entityService.findOne('plugin::users-permissions.user', id);
        socket.user = user;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });
    
    io.on('connection', (socket) => {
      console.log('a user connected');

      socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });

      socket.on('chatMessage', async (msg) => {
        const message = await strapi.entityService.create('api::message.message', {
          data: {
            content: msg.content,
            author: msg.author,
            room: msg.room,
            timestamp: new Date(),
          },
        });
        io.to(msg.room).emit('message', message);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

    strapi.io = io;
  },
};
