const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');


const buildWebpackConfig = merge(common, {
    mode: 'production',
    output: {
        publicPath: ''
    }


    /*output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.[contentHash].js"
    }*/

});

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig)
})