const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/bitcoin',
    createProxyMiddleware({
      target: 'http://20.51.222.156',
      changeOrigin: true,
      pathRewrite: {
        '^/bitcoin': '/bitcoin',
      },
      onProxyReq: function(proxyReq, req, res) {
        if (req.headers.host === 'localhost:3000') {
          res.statusCode = 403;
          res.end('Direct requests are not allowed');
        }
      },
    })
  );
};

