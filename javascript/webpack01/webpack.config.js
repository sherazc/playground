// https://www.youtube.com/watch?v=9kJVYpOqcVU&t=219s
// https://gist.github.com/learncodeacademy/25092d8f1daf5e4a6fd3
// determination if we are building for production
// if we are then we would run different plugins. Look below in plugins sections
// To pass NODE_ENV run this command:
//
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    // Working folder
    context: __dirname,
    //context: __dirname + "/app_dir",

    // Helpful for debuggers to map the code and console logging.
    // Read more:
    // https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map
    // https://webpack.github.io/docs/configuration.html#devtool
    devtool: debug ? "inline-sourcemap" : null,
    // Main entry point for the application
    entry: "./js/scripts.js",
    output: {
        // output destination directory and final file name
        path: __dirname + "/js",
        filename: "scripts.min.js"
    },
    plugins: debug ? [] : [
        // These plugins will only take effect if debug is true
        // Different plugins that will help minify and obfuscate our code
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};
