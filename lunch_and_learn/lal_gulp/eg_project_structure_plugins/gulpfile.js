const gulp = require("gulp");
const babel = require("gulp-babel");
const browserify = require('gulp-browserify');
const sourcemaps = require('gulp-sourcemaps');

gulp.task("build-js", () => {
    gulp.src("./src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
           presets: ['es2015']
        }))
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(sourcemaps.write("./sm"))
        .pipe(gulp.dest("dist/"));
});

gulp.task("build-html", () => {
    gulp.src("./src/html/**/*.html")
        .pipe(gulp.dest("dist/"));
});

gulp.task("default", ["build-js", "build-html"], () => {
    gulp.watch("./src/html/**/*.html", ["build-html"]);
    gulp.watch("./src/js/**/*.js", ["build-js"]);
});