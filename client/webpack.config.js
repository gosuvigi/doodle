/**
 * Created by ratoico on 9/2/15.
 */
'use strict';

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    srcPath = path.join(__dirname, 'src'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    target: 'web',
    cache: true,
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './src/js/app'
    ],
    resolve: {
        root: srcPath,
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'src']
    },
    output: {
        path: path.join(__dirname, 'tmp'),
        publicPath: '',
        filename: '[name].js',
        pathInfo: true,
        sourceMapFilename: '[file].map'
    },
    module: {
        loaders: [
            {test: /\.js?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel?cacheDirectory']},
            {test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=img/[name].[ext]'},
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loaders: ['url?limit=10000&mimetype=application/font-woff', 'file-loader?name=fonts/[name].[ext]']},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loaders: ['url?limit=10000&mimetype=application/octet-stream', 'file-loader?name=fonts/[name].[ext]']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[ext]'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loaders: ['url?limit=10000&mimetype=image/svg+xml', 'file-loader?name=fonts/[name].[ext]']},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/js/index.html'
        }),
        new webpack.NoErrorsPlugin(),
        // removes a lot of debugging code in React
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // keeps hashes consistent between compilations
        new webpack.optimize.OccurenceOrderPlugin(),
        // minifies your code
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('app.css'),
        // definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
            __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
        })
    ],

    debug: true,
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: './tmp',
        historyApiFallback: true
    }
};