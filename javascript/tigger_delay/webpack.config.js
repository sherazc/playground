const path = require('path');

module.exports = {
    entry: './src/Debounce.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'app.min.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist"
    },
    mode: 'development'
};
