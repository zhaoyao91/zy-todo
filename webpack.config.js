var webpack = require('webpack');

var PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: "www/dist/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {test: /\.css$/, loader: "style!css"}
        ]
    },
    plugins: [].concat(PRODUCTION ? [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            mangle: {except: ['$', 'JQuery', 'exports', 'require']}
        })
    ] : []),
    devtool: PRODUCTION ? false : 'source-map'
};