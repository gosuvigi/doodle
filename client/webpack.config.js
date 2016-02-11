var path = require('path')
var webpack = require('webpack')
var srcPath = path.join(__dirname, 'src')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        path.resolve(srcPath, 'js/index')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname
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
            },
            {
                test: /\.gif$/,
                exclude: /node_modules/,
                loader: "url-loader?mimetype=image/png"
            },
            {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                exclude: /node_modules/,
                loader: "url-loader?mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                exclude: /node_modules/,
                loader: "file-loader?name=[name].[ext]"
            }
        ]
    }
};