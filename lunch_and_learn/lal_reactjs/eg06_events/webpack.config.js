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
        path: path.resolve(__dirname, "src/js/"),
        filename: "app.min.js",
        publicPath: "/js",
    },
    /*
     We can use devServer: options to configure webpack-dev-server
     devServer: {
         // if devServer is defined then publicPath can be moved to it.
         publicPath: "/js",
         contentBase: "dist"
     },
     */
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
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            }
        ]
    },
    plugins: pluginArray
};
