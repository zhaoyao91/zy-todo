var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var PRODUCTION = process.env.NODE_ENV === 'production';
var OUTPUT_DIR = "www/dist/";

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: OUTPUT_DIR + "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-2'],
                    plugins: ["transform-function-bind"]
                }
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')},
            {test: /\.less$/, loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap')}
        ]
    },
    plugins: [
        new ExtractTextPlugin(OUTPUT_DIR + "style.css")
    ].concat(PRODUCTION ? [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            mangle: {except: ['$', 'JQuery', 'exports', 'require']}
        })
    ] : []),
    devtool: PRODUCTION ? false : 'source-map',
    resolve: {
        root: [
            path.resolve('./src')
        ]
    }
};