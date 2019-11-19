const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

const sourcemaps = require('gulp-sourcemaps')
const rollup = require('gulp-better-rollup')
const babel = require('rollup-plugin-babel')
const minify = require('rollup-plugin-babel-minify')


sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('_sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest('Content/css/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('_sass/**/*.sass', ['sass']);
});

gulp.task('js', () => {
    gulp.src('_mjs/main.js')
      .pipe(sourcemaps.init())
      .pipe(rollup({
        // There is no `input` option as rollup integrates into the gulp pipeline
        plugins: [
          babel({
            presets: [
              [
                'env',
                {
                  modules: false
                }
              ]
            ],
            plugins: [
              "external-helpers",
            ]
          }),
          minify( {
            // Options for babel-minify.
          } )
        ]
      }, {
        // Rollups `sourcemap` option is unsupported. Use `gulp-sourcemaps` plugin instead
        format: 'iife',
      }))
      // inlining the sourcemap into the exported .js file
      .pipe(sourcemaps.write(''))
      .pipe(gulp.dest('Content/js/'))     
})

gulp.task('js:watch', function () {
    gulp.watch('_mjs/**/*.js', ['js']);
});

gulp.task('watch', ['sass:watch', 'js:watch']);

gulp.task('default', ['watch']);