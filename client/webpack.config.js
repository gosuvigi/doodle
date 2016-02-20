var path = require('path')
var webpack = require('webpack')
var srcPath = path.join(__dirname, 'src')
var WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        path.resolve(srcPath, 'js/index')
    ],
    output: {
        path: __dirname + '/static',
        filename: 'bundle.js',
        publicPath: '/static',
        pathInfo: true,
        sourceMapFilename: 'bundle.map.js'
    },
    devServer: {
        outputPath: __dirname + '/static'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // this plugin is needed to be able to server the static resource with Spring Boot embedded server as well
        new WriteFilePlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: srcPath
            },
            {
                test: /\.json$/,
                loaders: ['json'],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['style', 'css'],
                include: srcPath
            },
            {
                test: /\.gif$/,
                exclude: /node_modules/,
                loader: "url-loader?mimetype=image/png",
                include: srcPath
            },
            {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                exclude: /node_modules/,
                loader: "url-loader?mimetype=application/font-woff",
                include: srcPath
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                exclude: /node_modules/,
                loader: "file-loader?name=[name].[ext]",
                include: srcPath
            }
        ]
    }
};