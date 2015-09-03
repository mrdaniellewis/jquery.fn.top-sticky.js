/* jshint node: true */
"use strict";

/**
 *	@fileoverview
 *	Minify the source
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var scriptPath = 'src/jquery.fn.top-sticky.js';

gulp.task( 'build', function() {

	gulp.src( scriptPath )
		.pipe(sourcemaps.init())
			.pipe( uglify( {preserveComments: function(node,comment) {
				return comment.value[0] === '!';
			} } ) )
			.pipe( rename({extname: '.min.js'}) )
		.pipe(sourcemaps.write( '.'))
		.pipe( gulp.dest( 'dist' ) );

	gulp.src( scriptPath )
		.pipe( gulp.dest( 'dist' ) );

} );

gulp.task('watch', function() {
	gulp.watch( scriptPath, ['build'] );
});

gulp.task( 'default', ['build'] );





