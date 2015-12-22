var gulp = require('gulp');
var sass = require('gulp-sass');
var handleErrors = require('../util/handleErrors');

gulp.task('styles', function () {
    return gulp.src('./src/scss/app.scss')
      .pipe(sass())
      .on('error', handleErrors)
      .pipe(gulp.dest('./dist/css'));
});