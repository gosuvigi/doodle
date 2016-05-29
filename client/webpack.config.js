var path = require('path')
var webpack = require('webpack')
var srcPath = path.join(__dirname, 'src')
var WriteFilePlugin = require('write-file-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

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
        outputPath: __dirname + '/static',
        // proxy: {
        //     '/api/*': {
        //         target: 'http://localhost:8080',
        //         secure: false,
        //         // node-http-proxy option - don't add /localhost:8080/ to proxied request paths
        //         prependPath: false
        //     }
        // },
    },
    historyApiFallback: {
        index: '/static'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: __dirname + "/src/html/index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: __dirname + "/src/html/login.html",
            filename: "login.html"
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // this plugin is needed to be able to serve the static resources with Spring Boot embedded server as well
        new WriteFilePlugin()
    ],
    module: {
        // Shut off warnings about using pre-built javascript files as Quill.js unfortunately ships one as its `main`.
        noParse: [
            path.resolve('node_modules/react-quill/node_modules/quill/dist/quill.js'), //npm 2
            path.resolve('node_modules/quill/dist/quill.js') //npm 3
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: srcPath
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
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "html"
            }
        ]
    }
};