const closure = require('rollup-plugin-closure-compiler-js');

export default {
  entry: 'src/js/Main.js',
  dest: 'dist/js/AngularLazyLoad.min.js',
  format: 'iife',
  sourceMap: 'true',
  plugins: [
    closure({
      compilationLevel: 'SIMPLE'
    })
  ]
};