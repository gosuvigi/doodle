/**
 * Created by ratoico on 9/3/15.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = 3000;
var ip = '0.0.0.0';

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    },
    headers: {'Access-Control-Allow-Origin': '*'}
}).listen(port, ip, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at ' + ip + ':' + port + '.');
    });
