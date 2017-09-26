const gulp = require("gulp");
const babel = require("gulp-babel");
var browserify = require('browserify')
//var watchify = require('watchify')
var babelify = require('babelify')
const sourcemaps = require('gulp-sourcemaps');
//var babelify = require('babelify')



function map_error(err) {
    if (err.fileName) {
      // regular error
      gutil.log(chalk.red(err.name)
        + ': '
        + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
        + ': '
        + 'Line '
        + chalk.magenta(err.lineNumber)
        + ' & '
        + 'Column '
        + chalk.magenta(err.columnNumber || err.column)
        + ': '
        + chalk.blue(err.description))
    } else {
      // browserify error..
      gutil.log(chalk.red(err.name)
        + ': '
        + chalk.yellow(err.message))
    }
  
    this.end()
  }
gulp.task("build-js", () => {
    
    browserify('./src/js/calculator.js', { debug: true }).transform(babelify, {presets: ["es2015"]})
    .bundle().pipe(sourcemaps.init({ loadMaps: true })).pipe(sourcemaps.write("./sm"))
    .pipe(gulp.dest("dist/"));

/*
    gulp.src("./src/js/*.js")
        .pipe(sourcemaps.init({ loadMaps: true }))
        //.pipe(babel({
        //   presets: ['es2015']
        //}))
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }).transform(babelify, {
            presets: ["es2015"]
        }))
        .pipe(sourcemaps.write("./sm"))
        .pipe(gulp.dest("dist/"));
        */
});

gulp.task("build-html", () => {
    gulp.src("./src/html/**/*.html")
        .pipe(gulp.dest("dist/"));
});

gulp.task("default", ["build-js", "build-html"], () => {
    gulp.watch("./src/html/**/*.html", ["build-html"]);
    gulp.watch("./src/js/**/*.js", ["build-js"]);
});