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
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "../../ui/public/static/prayer-time-widget"),
        filename: "app.min.js",
        // publicPath: "/dist"
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
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    plugins: pluginArray
};

// console.log(module);

// Adding additional configuration to existing configuration
/*

if (process.env.BUILD_TYPE === "DEV") {
    module.exports.devtool = "source-map";
}
*/
