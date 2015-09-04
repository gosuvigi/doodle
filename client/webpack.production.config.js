/**
 * Created by ratoico on 9/4/15.
 */
var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'dist', '');
var mainPath = path.resolve(__dirname, 'src/js', 'app.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {

    // We change to normal source mapping
    devtool: 'source-map',
    entry: mainPath,
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')},
            {test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.gif$/, loaders: ['url-loader?mimetype=image/png', 'file-loader?name=[path][name].[ext]']},
            {test: /\.ico$/, loaders: ['file-loader?name=[path][name].[ext]']},
            {test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loaders: ['url-loader?mimetype=application/font-woff', 'file-loader?name=[path][name].[ext]']},
            {test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loaders: ['file-loader?name=[path][name].[ext]']},
            {test: /\.js$/, loader: 'babel', exclude: [nodeModulesPath]}
        ]
    },
    plugins: [
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
        new ExtractTextPlugin('style.css', {allChunks: true})
    ]
};

module.exports = config;
