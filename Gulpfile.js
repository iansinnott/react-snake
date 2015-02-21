var gulp = require('gulp'),

    // Styles
    stylus = require('gulp-stylus'),
    axis = require('axis'),
    rupture = require('rupture'),

    // Bundle
    browserify = require('browserify'),
    renameBundle = require('vinyl-source-stream'),

    // React
    react = require('react'),

    // Utils
    plumber = require('gulp-plumber'),
    debug = require('debug')('gulp'),

    // Serve
    connect = require('gulp-connect');


var ifProduction = process.env.NODE_ENV === 'production';

gulp.task('serve', function() {
  connect.server({
    root: 'dist',
    port: process.env.port || 3000,
    livereload: true
  });
});

gulp.task('stylus', function() {
  debug('Compiling stylus files');
  gulp.src('src/**/*.styl')
    .pipe(stylus({
      compress: (process.env.NODE_ENV === 'production'),
      use: [axis(), rupture()]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('bundle', function() {
  debug('Buliding browserify bundle');
  browserify('src/**/*.jsx')
    .transform(reactify)
    .bundle()
    .pipe(plumber())
    .pipe(renameBundle('bundle.js'))
    .pipe(gulp.dest('dist/'));
})

gulp.task('css', function() {
  debug('Piping CSS to connect.reload');
  gulp.src('dist/**/*.css')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  debug('Watch task started');
  gulp.watch('dist/**/*.css', ['css']);
})

gulp.task('default', ['serve', 'watch']);
