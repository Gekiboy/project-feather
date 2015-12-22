var changed = require('gulp-changed'),
  gulp = require('gulp');

gulp.task('audio', function() {
  var dest = './dist/audio';
    return gulp.src('./src/audio/**')
        .pipe(changed(dest)) // Ignore unchanged files
        .pipe(gulp.dest(dest));
});
