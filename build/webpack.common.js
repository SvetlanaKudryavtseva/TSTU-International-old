/* Common config:
   ========================================================================== */
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');



const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
    pug: 'pug'
}

// const PAGES_DIR = PATH.src
const PAGES_DIR = `${PATHS.src}/${PATHS.pug}/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
        externals: {
            paths: PATHS
        },
        entry: {
            //app: './src/app.js'
            app: PATHS.src,
            lk: `${PATHS.src}/lk.js`
        },
        output: {
            filename: `${PATHS.assets}js/[name].[hash].js`,
            path: PATHS.dist,
            publicPath: '/'
        },
        watch: true,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: 'vendors',
                        test: /node_modules/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.(ttf|eot|woff|svg|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/css',
                        publicPath: '/assets/css'
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg)$/i,
                    include: `${PATHS.src}/${PATHS.assets}images`, //take images only from this folder
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'assets/images/'
                    }
                },
                {
                    test: /\.pug$/,
                    loader: ['pug-loader']
                },
                // {
                //     test: /\.scss$/,
                //     use: [
                //         "style-loader",
                //         MiniCssExtractPlugin.loader,
                //         {
                //             loader: 'css-loader',
                //             options: { sourceMap: true }
                //         }, {
                //             loader: 'postcss-loader',
                //             options: {
                //                 postcssOptions: {
                //                     sourceMap: true,
                //                     config: path.resolve(__dirname, '../postcss.config.js'),
                //                 },
                //             },
                //         }, {
                //             loader: 'sass-loader',
                //             options: { sourceMap: true }
                //         }
                //     ]
                // },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    sourceMap: true,
                                    config: path.resolve(__dirname, '../postcss.config.js'),
                                },
                            },
                        },
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    sourceMap: true,
                                    config: path.resolve(__dirname, '../postcss.config.js'),
                                },
                            },
                        }, {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        }
                    ]
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: `${PATHS.assets}css/[name].[hash].css`,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: `${PATHS.src}/${PATHS.assets}images`, to: `${PATHS.assets}/images` },
                    //{ from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}/css` },
                    { from: `${PATHS.src}/static`, to: '' }
                ]
            }),
            ...PAGES.map(page => new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `./${page.replace (/\.pug/, '.html')}`
            }))

        ]
    }
    /*module.exports = (env, argv) => {
        if (argv.mode === 'development') {}
        if (argv.mode === 'production') {}
        return config;
    }*/