var gulp = require('gulp'),

    // Styles
    stylus = require('gulp-stylus'),
    axis = require('axis'),
    rupture = require('rupture'),

    // Bundle
    browserify = require('browserify'),
    renameBundle = require('vinyl-source-stream'),
    reactify = require('reactify'),

    // Utils
    plumber = require('gulp-plumber'),
    debug = require('debug')('gulp'),

    // Serve
    connect = require('gulp-connect');


var paths = {
  jsx: 'client/**/*.jsx',
  jsxMain: 'client/index.jsx',
  styl: 'client/**/*.styl',
  stylMain: 'client/index.styl',
  htmlMain: 'client/index.html',

  destination: 'public/'
};

gulp.task('serve', function() {
  debug('Starting server');
  connect.server({
    root: paths.destination,
    port: process.env.port || 3000,
    livereload: true
  });
});

gulp.task('html', function() {
  debug('Copying HTML over to public/')
  gulp.src(paths.htmlMain)
    .pipe(gulp.dest(paths.destination));
});

gulp.task('stylus', function() {
  debug('Compiling stylus files');
  gulp.src(paths.stylMain)
    .pipe(stylus({
      compress: (process.env.NODE_ENV === 'production'),
      use: [axis(), rupture()]
    }))
    .pipe(gulp.dest(paths.destination));
});

gulp.task('bundle', function() {
  debug('Buliding browserify bundle');
  browserify(process.cwd() + '/' + paths.jsxMain)
    .transform(reactify)
    .bundle()
    .pipe(plumber())
    .pipe(renameBundle('bundle.js'))
    .pipe(gulp.dest(paths.destination))
    .pipe(connect.reload());
})

gulp.task('css', function() {
  debug('Piping CSS to connect.reload');
  gulp.src(paths.destination + '**/*.css')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  debug('Watch task started');
  gulp.watch(paths.jsx, ['bundle']);
  gulp.watch(paths.styl, ['stylus']);
  gulp.watch(paths.destination + '**/*.css', ['css']);
});

gulp.task('build', ['html', 'stylus', 'bundle']);

gulp.task('default', ['build', 'serve', 'watch']);
