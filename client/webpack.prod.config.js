/**
 * Created by vigi on 4/17/2016 11:58 AM.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
var mainPath = path.resolve(__dirname, 'src/js', 'index');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: mainPath,
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },

    module: {
        noParse: [
            path.resolve('node_modules/react-quill/node_modules/quill/dist/quill.js'), //npm 2
            path.resolve('node_modules/quill/dist/quill.js') //npm 3
        ],
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
                loader: ExtractTextPlugin.extract('css-loader'),
            },
            {
                test: /\.gif$/,
                loaders: ['url-loader?mimetype=image/png', 'file-loader?name=[path][name].[ext]'],
                exclude: [nodeModulesPath]
            },
            {
                test: /\.ico$/,
                loaders: ['file-loader?name=[path][name].[ext]'],
                exclude: [nodeModulesPath]
            },
            {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                loaders: ['url-loader?mimetype=application/font-woff', 'file-loader?name=[path][name].[ext]'],
                exclude: [nodeModulesPath]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                loaders: ['file-loader?name=[path][name].[ext]'],
                exclude: [nodeModulesPath]
            },
        ]
    },
    postcss: [
        require('autoprefixer')
    ],

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: __dirname + "/src/html/index.html",
            filename: "index.html"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('style.css', {allChunks: true})
    ]
}
