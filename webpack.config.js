const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const PRODUCTION = process.env.NODE_ENV === 'production';
const SRC_DIR = './src';
const OUTPUT_DIR = "www/dist/";
const REQUIRED_ENV = [
    'BASE_URL',
];

module.exports = {
    entry: SRC_DIR + '/main.js',
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
            {test: /\.less$/, loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap')},
            {test: /\.json$/, loader: 'json-loader'}
        ]
    },
    plugins: [
        new ExtractTextPlugin(OUTPUT_DIR + "style.css"),
        new webpack.EnvironmentPlugin(REQUIRED_ENV)
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
            path.resolve(SRC_DIR)
        ]
    }
};