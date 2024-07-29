'use strict';

module.exports = {
  async create(ctx) {
    try {
      const { content, room } = ctx.request.body.data;
      const { user } = ctx.state;
    
      const message = await strapi.entityService.create('api::message.message', {
        data: {
          content,
          room,
          author: String(user.username),
          timestamp: new Date(),
        },
      });

      strapi.io.to(room).emit('message', message);

      return message;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async find(ctx) {
    try {
      const { room } = ctx.query;
      const messages = await strapi.entityService.findMany('api::message.message',{
        filters : {
          room : room
        }
      });

      return messages;
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};