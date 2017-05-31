const gulp = require('gulp');
const concat = require('gulp-concat');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const closure = require('rollup-plugin-closure-compiler-js');

gulp.task('default', ['build']);

gulp.task('build', () =>
  rollup.rollup({
    entry: "./src/js/Main.js",
    plugins: [
      babel({
        babelrc: "./.babelrc",
        exclude: 'node_modules/**'
      }),
      closure({
        compilationLevel: 'SIMPLE'
      })
    ]
  }).then(function (bundle) {
    bundle.write({
      format: "umd",
      moduleName: "AngularLazyLoad",
      dest: "./dist/js/AngularLazyLoad.min.js",
      sourceMap: true
    })
  })
);

gulp.task('watch', ['build'], () =>
  gulp.watch(['src/**/*.js'], ['build'])
);