'use strict';
/**
 * Gulp config file for scss-base
 *
 * @author Sebastian Kalicki sebastian@kalicki.email
 * @version 0.1.0
 */

module.exports = {
	copy: {
		src: 'src/**/*.{ttf,woff,eof,svg,png,jpg,tpl}',
		dest: 'dev/',
	},
	sass: {
		src: 'scss/**/*.s+(a|c)ss',
		dev: 'css/',
		autoprefixer: ['IE 10', '> 1%'],
	}
};