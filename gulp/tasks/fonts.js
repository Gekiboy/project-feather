var changed = require('gulp-changed'),
  gulp = require('gulp');

gulp.task('fonts', function() {
  var dest = './dist/fonts';
	return gulp.src('./src/fonts/**')
		.pipe(changed(dest))
		.pipe(gulp.dest(dest));
});
