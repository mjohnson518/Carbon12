const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');

module.exports = function (app) {
  app.use(
    '/typeform/**',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3001/typeform',
      headers: {
        accept: 'application/json',
        method: 'GET',
      },
      changeOrigin: true,
    })
  );

  app.use(
    '/upload-to-ipfs/**',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3001/upload-to-ipfs',
      headers: {
        accept: 'application/json',
        method: 'POST',
      },
      changeOrigin: true,
    })
  );

  app.use(
    '/upload-img-to-ipfs/**',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3001/upload-to-ipfs',
      headers: {
        accept: 'application/json',
        method: 'POST',
      },
      changeOrigin: true,
    })
  );

  app.use(
    '/create-qr-code/**',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3001/create-qr-code',
      headers: {
        accept: 'application/json',
        method: 'POST',
      },
      changeOrigin: true,
    })
  );

  app.use(
    '/read-qr-code/**',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3001/read-qr-code',
      headers: {
        accept: 'application/json',
        method: 'GET',
      },
      changeOrigin: true,
    })
  );

  app.use(morgan('combined'));
};
