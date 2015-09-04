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
        'webpack-dev-server/client?http://158.166.39.148:3000',
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
        filename: 'bundle.js',
        pathInfo: true,
        sourceMapFilename: 'bundle.map.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')},
            //{test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.gif$/, loaders: ['url-loader?mimetype=image/png', 'file-loader?name=[path][name].[ext]']},
            {test: /\.ico$/, loaders: ['file-loader?name=[path][name].[ext]']},
            {test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loaders: ['url-loader?mimetype=application/font-woff', 'file-loader?name=[path][name].[ext]']},
            {test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loaders: ['file-loader?name=[path][name].[ext]']},
            {
                test: /\.js?$/,
                include: srcPath + "/js",
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?cacheDirectory']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
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
        new ExtractTextPlugin('style.css', {allChunks: true}),
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