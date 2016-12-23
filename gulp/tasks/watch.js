'use strict';

/**
 * Watch tasks for scss-base
 *
 * @author Sebastian Kalicki sebastian@kalicki.email
 * @version 0.1.0
 */

var config = require('../config'),
	gulp = require('gulp');

gulp.task('watch', function (){
	gulp.watch(config.sass.src, ['sass']);
});
