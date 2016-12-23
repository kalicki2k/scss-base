'use strict';

/**
 * Gulp for scss-base
 *
 * @author Sebastian Kalicki sebastian@kalicki.email
 * @version 0.1.0
 */

var fs = require('fs'),
	tasks = fs.readdirSync('./gulp/tasks/');

tasks.forEach((task) => {
	require(`./tasks/${task}`);
});
