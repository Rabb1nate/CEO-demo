const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://120.79.207.60:8089',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    },
  }));
};
