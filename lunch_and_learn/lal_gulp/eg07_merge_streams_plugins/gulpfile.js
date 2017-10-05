const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const merge = require('merge-stream');
const minifyCss = require('gulp-minify-css');

gulp.task("compile-css", () => {

	// Create all CSS files source stream.
	// Concated it into a temporary filename all_css.css
	// This file will not be created anywhere until gulp.dest() gets called. 
	let cssStream = gulp.src("./src/css/**/*.css")
		.pipe(concat("all_css.css"));

	// Create all SASS files source stream.
	// Compiled it
	// Concated it into a temporary file name all_sass.sass
	// This file will not be created anywhere until gulp.dest() gets called. 
	let sassStream = gulp.src("./src/sass/**/*.sass")
		.pipe(sass())
		.pipe(concat("all_sass.sass"));


	// Merged both streams into a new stream.
	// Concated it into a file name styles.css
	// Minified it
	// Created file in directory dist/css/
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
