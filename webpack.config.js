const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            Static: path.resolve(__dirname, 'static/'),
            Core: path.resolve(__dirname, 'src/core/'),
            Utils: path.resolve(__dirname, 'src/utils/'),
            Constants$: path.resolve(__dirname, 'src/utils/constants.ts'),
            Interfaces$: path.resolve(__dirname, 'src/utils/interfaces.ts')
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ],
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    'ts-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    'file-loader'
                ]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ]
};
