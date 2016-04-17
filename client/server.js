var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var httpProxy = require('http-proxy');

var app = new (require('express'))();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler));

const targetUrl = 'http://localhost:8080';

const proxy = httpProxy.createProxyServer({
    target: targetUrl,
    ws: true
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
    var json;
    if (error.code !== 'ECONNRESET') {
        console.error('proxy error', error);
    }
    if (!res.headersSent) {
        res.writeHead(500, {'content-type': 'application/json'});
    }

    json = {error: 'proxy_error', reason: error.message};
    res.end(JSON.stringify(json));
});

// Proxy to API server
app.use('/api', (req, res) => {
    proxy.web(req, res, {target: targetUrl + "/api"});
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/static/index.html')
});

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==>  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});