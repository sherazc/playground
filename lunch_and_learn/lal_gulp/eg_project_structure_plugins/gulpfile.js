var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var gutil = require('gulp-util');

gulp.task('scripts', function() {
	browserify({ debug: true })
		.transform(babelify, { presets: ["env"] })
		.require("./src/js/main.js", { entry: true })
		.bundle()
		.on('error',gutil.log)
		.pipe(source('bundle.js'))
    	.pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function () {
    gulp.watch("./src/html/**/*.html", ["build-html"]);
    gulp.watch(['./src/js/**/*.js'], ['scripts']);
});

gulp.task("build-html", () => {
    gulp.src("./src/html/**/*.html")
        .pipe(gulp.dest("dist/"));
});

gulp.task('default', ['scripts', "build-html", 'watch']);