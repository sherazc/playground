const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const merge = require('merge-stream');
const minifyCss = require('gulp-minify-css');

gulp.task("compile-css", () => {

	let cssStream = gulp.src("./src/css/**/*.css")
		.pipe(concat("all_css.css"));

	let sassStream = gulp.src("./src/sass/**/*.sass")
		.pipe(sass())
		.pipe(concat("all_sass.sass"));

	merge(cssStream, sassStream)
		.pipe(concat("styles.css"))
		.pipe(minifyCss())
		.pipe(gulp.dest("dist/css/"));
});

gulp.task("copy-html", () => {
	gulp.src("./src/html/**/*.html")
		.pipe(gulp.dest("dist/"))
});

gulp.task("default", ["compile-css", "copy-html"], () => {
    gulp.watch(["./src/css/**/*.css", "./src/sass/**/*.sass"], ["compile-css"]);
    gulp.watch("./src/html/**/*.html", ["copy-html"]);
});
