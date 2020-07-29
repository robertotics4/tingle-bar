const proxy = require('http-proxy-middleware');

module.exports = app => {
    app.use(proxy('/api/tiposEstabelecimento', {
        target: 'http://52.45.128.89',
        secure: false,
        changeOrigin: true
    }));
};