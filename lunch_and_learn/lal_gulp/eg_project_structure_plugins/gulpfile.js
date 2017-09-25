const gulp = require("gulp");
const babel = require("gulp-babel");
const browserify = require('gulp-browserify');

gulp.task("default", () => {
    gulp.src("./src/js/calculator.js")
        .pipe(babel({
           presets: ['es2015']
        }))
        .pipe(browserify({
            insertGlobals: false,
            debug: true
        }))
        .pipe(gulp.dest("dist/"));
});