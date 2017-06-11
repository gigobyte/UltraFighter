const path = require('path')

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
    }
}
