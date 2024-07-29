module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    path: env('ADMIN_PATH', '/admin'),
    url: env('STRAPI_ADMIN_BACKEND_URL', 'http://localhost:1337/admin'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  telemetry: {
    disabled: env.bool('STRAPI_TELEMETRY_DISABLED', true),
  },
});
