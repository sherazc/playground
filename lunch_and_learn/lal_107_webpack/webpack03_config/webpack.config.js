// path is one of node's core module.
let path = require("path");

module.exports = {
    // Starting point of application
    entry: "./src/js/app.js",
    // Output (bundle/transpiled/compiled) file configuration
    output: {
        /*
        path.resolve([...paths]) method takes in sequence of paths and concatenates them.
        __dirname is node variable, it contains absolute path of current directory.
        path defines the directory where output will be created
        */
        path: path.resolve(__dirname, "dist"),
        // filename is bundle file name.
        filename: "app.min.js",
        // public URL address that will be created by webpack-dev-server
        publicPath: "/dist"
    }
};
