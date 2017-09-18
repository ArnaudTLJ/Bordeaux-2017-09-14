'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');

var minify = require('gulp-minifier');

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


// tâches pour la prod

gulp.task('copyHTML', function() {
	return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'));
});
gulp.task('copyJS', function() {
	return gulp.src('src/js/production.js')
	.pipe(minify({
    	minify: true,
    	collapseWhitespace: true,
    	conservativeCollapse: true,
    	minifyJS: true,
    	minifyCSS: true
  		}))
    .pipe(gulp.dest('dist/js/'));
});
gulp.task('copyCSS', function() {
	return gulp.src('src/css/global.css')
    .pipe(minify({
    	minify: true,
    	collapseWhitespace: true,
    	conservativeCollapse: true,
    	minifyJS: true,
    	minifyCSS: true
  		}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('prod', ['copyHTML', 'copyCSS', 'copyJS'], function() {
	// mettre tous les html dans un dossier dist
	// mettre global.css minifié dans dist/css
	// mettre production.js minifié dans dist/js
});