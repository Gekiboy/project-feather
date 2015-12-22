var changed = require('gulp-changed'),
  gulp = require('gulp');

gulp.task('textures', function() {
  var dest = './dist/textures';
    return gulp.src('./src/textures/**')
        .pipe(changed(dest)) // Ignore unchanged files
        .pipe(gulp.dest(dest));
});
