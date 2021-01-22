const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const devWebpackConfig = merge(common, {
    mode: 'development',
    //contentBase: common.externals.paths.dist,

    //contentBase: './dist',

    /*output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js"
    },*/
    devtool: 'inline-source-map',
    devServer: {
        contentBase: common.externals.paths.dist,
        port: 8081,
        overlay: {
            warnings: true,
            errors: true,
        },
        writeToDisk: true
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        /*new webpack.LoaderOptionsPlugin({
            options: {
                contentBase: common.externals.paths.dist
            }
        })*/
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
})