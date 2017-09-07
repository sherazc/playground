let path = require("path");

module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.min.js",
        publicPath: "/dist"
    },
    module: {
        rules: [
            {
                // Regular express. Pattern of files to apply the loader to
                test: /\.css$/,
                // List of loaders to be applied in sequence
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};
