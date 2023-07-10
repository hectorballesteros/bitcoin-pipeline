const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000/', // URL del servidor de origen
      changeOrigin: true, // Cambia el encabezado del host a la URL de destino
    })
  );
};