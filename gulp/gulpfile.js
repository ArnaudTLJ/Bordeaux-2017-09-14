'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');

// créer la tâche
gulp.task('sass', function(){
	return gulp.src('src/scss/global.scss')
		.pipe(sass())
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('concatJs', function() {
  return gulp.src('./src/javascript/*.js')
    .pipe(concat('production.js'))
    .pipe(gulp.dest('./src/js/'));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('watch', ['browserSync', 'sass', 'concatJs'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/javascript/**/*.js', ['concatJs']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src:js/**/*.js', browserSync.reload);
});
