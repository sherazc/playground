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
    entry: "./src/js/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.min.js",
        publicPath: "/dist"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            }
        ]
    },
    plugins: pluginArray
};

// Adding additional configuration to existing configuration
if (process.env.BUILD_TYPE === "DEV") {
    module.exports.devtool = "source-map";
}