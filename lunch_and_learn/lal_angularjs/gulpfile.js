const gulp = require("gulp");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const scripts = require("./scripts");
const styles = require("./styles");

let devMode = false;

gulp.task("css", () => {
    gulp.src(styles)
        .pipe(concat("main.css"))
        .pipe(gulp.dest("./dest/css"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("js", () => {
    gulp.src(scripts)
        .pipe(concat("script.js"))
        .pipe(gulp.dest("./dest/js"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("html", () => {
    gulp.src("./src/template/**/*.html")
        .pipe(gulp.dest("./dest"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("build", () => {
    gulp.start(["css", "js", "html"]);
});

gulp.task("browser-sync", () => {
    browserSync.init(null,{
        open: false,
        server: {baseDir: "dist"}
    });
});

gulp.task("start", () => {
    gulp.start(["build", "browser-sync"]);
    gulp.watch(["./src/css/**/*.css"], ["css"]);
    gulp.watch(["./src/js/**/*.js"], ["js"]);
    gulp.watch(["./src/css/**/*.css"], ["css"]);
});