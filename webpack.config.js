const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: 'inline-sourcemap',
    entry: path.resolve(__dirname, 'src', 'main.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.ts']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.PORT': JSON.stringify(process.env.PORT)
        })
    ]
}
