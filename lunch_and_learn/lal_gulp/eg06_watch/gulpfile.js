const gulp = require("gulp");
const concat = require("gulp-concat");

gulp.task("build-html", () => {
    gulp.src("./src/html/**/*.html")
        .pipe(gulp.dest("./dist"));
});

gulp.task("build-js", () => {
    gulp.src("./src/js/**/*.js")
        .pipe(concat("main.js"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["build-html", "build-js"]);

gulp.task("build-and-watch", () => {
    gulp.start("default");
    gulp.watch("./src/js/**/*.js", ["build-js"]);
    gulp.watch("./src/html/**/*.html", ["build-html"]);
});
