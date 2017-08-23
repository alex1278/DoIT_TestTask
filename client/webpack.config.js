const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../server/public')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','less-loader']
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            } 
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './client/index.html', to: 'index.html' },
        ]),
        new ExtractTextPlugin({   
            filename: '/css/[name].css'            
        })      
    ]
}