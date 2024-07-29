'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/messages',
      handler: 'message.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
        method: "GET",
        path: "/messages",
        handler : 'message.find',
        config: {
            policies:[],
            middlewares:[]
        }
    }
  ],
};