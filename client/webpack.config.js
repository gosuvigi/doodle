/**
 * Created by vigi on 9/2/15.
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
        path.resolve(srcPath, 'js/app.jsx')
    ],
    resolve: {
        root: srcPath,
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'src']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '',
        filename: 'bundle.js',
        pathInfo: true,
        sourceMapFilename: 'bundle.map.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader'), include: srcPath + "/css"},
            //{test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader']},
            {
                test: /\.gif$/,
                loaders: ['url-loader?mimetype=image/png', 'file-loader?name=[path][name].[ext]'],
                include: srcPath + "/img"
            },
            {test: /\.ico$/, loaders: ['file-loader?name=[path][name].[ext]'], include: srcPath + "/img"},
            {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                loaders: ['url-loader?mimetype=application/font-woff', 'file-loader?name=[path][name].[ext]'],
                include: srcPath + "/fonts"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                loaders: ['file-loader?name=[path][name].[ext]'],
                include: srcPath + "/fonts"
            },
            {
                test: /\.jsx?$/,
                include: srcPath + "/js",
                exclude: /node_modules/,
                loader: 'react-hot!babel'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new HtmlWebpackPlugin({
            inject: false,
            template: 'src/html/index.html'
        }),
        new webpack.NoErrorsPlugin(),
        // removes a lot of debugging code in React
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            }
        }),
        new ExtractTextPlugin('style.css', {allChunks: true}),
        // definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
        //new webpack.DefinePlugin({
        //    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
        //    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
        //})
    ],

    debug: true,
    //devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    devServer: {
        contentBase: './build',
        historyApiFallback: true
    }
};