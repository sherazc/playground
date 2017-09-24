const gulp = require("gulp");
const concat = require("gulp-concat");

gulp.task("default", () => {
    // build JS
    gulp.src("./src/js/**/*.js")
        .pipe(concat("main.js"))
        .pipe(gulp.dest("./dist"));

    // Copy htmls
    gulp.src("./src/html/**/*.html")
        .pipe(gulp.dest("./dist"));
});

