'use strict';

/**
 * Sass tasks for scss-base
 *
 * @author Sebastian Kalicki sebastian@kalicki.email
 * @version 0.1.0
 */

var autoprefixer = require('gulp-autoprefixer'),
	config = require('../config'),
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function postcss() {
	return gulp.src(config.sass.src)
		.pipe(sourcemaps.init())
		.pipe(autoprefixer(config.sass.autoprefixer))
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.sass.dev));
});
