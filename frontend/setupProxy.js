const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://20.51.187.212/api', // URL del servidor de origen
      changeOrigin: true, // Cambia el encabezado del host a la URL de destino
    })
  );
};