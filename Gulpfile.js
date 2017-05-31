const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('default', ['build']);

gulp.task('build', () =>
  gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('scrollTo.js'))
    .pipe(gulp.dest('dist/js'))
);

gulp.task('watch', ['build'], () =>
  gulp.watch(['src/**/*.js'], ['build'])
);