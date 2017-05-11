const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', ['build']);

gulp.task('build', () =>
  gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('watch', ['build'], () =>
  gulp.watch(['src/**/*.js'], ['build'])
);