var changed = require('gulp-changed'),
  gulp = require('gulp');

gulp.task('objects', function() {
  var dest = './dist/objects';
	return gulp.src('./src/objects/**')
		.pipe(changed(dest)) // Ignore unchanged files
		.pipe(gulp.dest(dest));
});
