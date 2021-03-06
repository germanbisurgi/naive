var gulp = require('gulp');
var concat = require('gulp-concat');
var scripts = [
  './src/polyfills.js',
  './src/box2dweb.js',
  './src/asset.js',
  './src/assets-system.js',
  './src/calc.js',
  './src/camera.js',
  './src/canvas.js',
  './src/game.js',
  './src/key.js',
  './src/keys-system.js',
  './src/loop.js',
  './src/physics-system.js',
  './src/pointer.js',
  './src/pointers-system.js',
  './src/pool.js',
  './src/renderable.js',
  './src/render.js',
  './src/signal.js',
  './src/state.js',
  './src/state-system.js',
  './src/outro.js'
];

gulp.task('concat-dist', function () {
  gulp.src(scripts)
    .pipe(concat('naive.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('concat-docs', function () {
  gulp.src(scripts)
    .pipe(concat('naive.js'))
    .pipe(gulp.dest('./docs/scripts'));
});

gulp.task('watch', function () {
  gulp.watch('./src/*.js', ['concat-dist', 'concat-docs']);
});
