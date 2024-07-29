module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('a user connected');
  
      socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });
  
      socket.on('chatMessage', async (msg) => {
        const message = await strapi.services.message.create({
          content: msg.content,
          author: msg.author,
          room: msg.room,
          timestamp: new Date(),
        });
        io.to(msg.room).emit('message', message);
      });
  
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  };
  