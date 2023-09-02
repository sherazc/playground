let path = require("path");
let webpack = require("webpack");

// Using environment variables to do additional configuration.
let pluginArray;
if (process.env.BUILD_TYPE === "PROD") {
    pluginArray = [new webpack.optimize.UglifyJsPlugin()];
} else {
    pluginArray = [];
}

module.exports = {
    entry: "./src/app.ts",
    output: {
        path: path.resolve(__dirname, "../../ui/public/static/frame-widget"),
        filename: "app.min.js",
        // publicPath: "/dist"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.ts$/,
                loader: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: pluginArray
};
