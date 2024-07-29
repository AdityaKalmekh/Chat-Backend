'use strict';

module.exports = {
    async create(ctx) {
      try {
        const { name } = ctx.request.body;
        const { user } = ctx.state;
        const rooms = await strapi.entityService.create('api::room.room', {
          data: {
            roomId : name,
            userId : String(user.id)
          },
        });
  
        return rooms;
      } catch (error) {
        ctx.throw(500, error);
      }
    },
    async find(ctx) {
        const { user } = ctx.state;
        try {
            const rooms = await strapi.entityService.findMany('api::room.room',{
                filters : {
                    userId : user.id
                }
            })
            return rooms;
        }
        catch (error) {
            ctx.throw(500, error);
        }

    },
    async findOne(ctx){
        const {roomId} = ctx.params;
        const { user } = ctx.state;
        try {
            const response = await strapi.entityService.findMany('api::room.room',{
                filters : {roomId: roomId}
            });
            if (response.length === 0){
                try {
                    const rooms = await strapi.entityService.create('api::room.room', {
                        data: {
                          roomId,
                          userId : String(user.id)
                        },
                      });
                    return rooms;    
                }
                catch (error) {
                    ctx.throw(500, error);
                }
            }else{
                return response
            }
        }
        catch (error) {
            ctx.throw(500, error);
        }
    }
}  
