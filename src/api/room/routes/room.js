'use strict';


module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/rooms',
        handler: 'room.create',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: "GET",
        path: "/rooms",
        handler : 'room.find',
        config: {
          policies:[],
          middlewares:[]
        },
      },
      {
        method: 'GET',
        path: '/rooms/:roomId',
        handler: 'room.findOne',
        config: {
          policies: [],
          middlewares: [],
        },
      }, 
    ]
};