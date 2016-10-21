var path = require('path')
var webpack = require('webpack')
module.exports = {
    entry: './test/unit/index.js',
    output: {
        path: path.resolve(__dirname, '../test/unit'),
        filename: 'specs.js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            src: path.resolve(__dirname, '../src')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                // NOTE: use absolute path to make sure
                // running tests is OK even if it is in node_modules of other project
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ]
            }, {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"deveploment"'
            },
            '__THEME': '"mat"'
        })
    ],
    devtool: 'source-map'
}
