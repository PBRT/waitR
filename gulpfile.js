var gulp = require('gulp'),
  jade = require('gulp-jade'),
  $ = require('gulp-load-plugins')(),
  watch = require('gulp-watch'),
  stylus = require('gulp-stylus'),
  nib = require('nib'),
  del = require('del'),
  wiredep = require('wiredep'),
  concat = require('gulp-concat'),
  clean = require('gulp-clean'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('assets', function(){
  gulp.src(['assets/*', 'assets/*/**', 'assets/*/*/**'], {base:"."})
  .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return gulp.src('app/tmp', {read: false})
  .pipe(clean());
});

gulp.task('templates', function() {
  return gulp.src('./components/**/*.jade')
    .pipe($.jade({
      pretty: true,
      doctype: 'html'
    }))
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(gulp.dest('./dist/html/'))
});

gulp.task('scripts', function() {
  gulp.src('./dist/*.js')
  .pipe(concat('all.js'))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('stylus', function(cb) {
  return gulp.src([ './styles/app.styl', './components/**/*.styl' ])
  .pipe($.stylus({
    use: [ nib() ],
    sourcemap: {
      inline: true
    },
  }))
  .on('error', function(err) {
    console.log('\nStylus Error:\n');
    console.log(err.message);
    cb();
  })
  .pipe(concat('all.css'))
  .pipe(gulp.dest('./dist/css'))
  .pipe(reload({stream:true}));
});

gulp.task('build', ['clean', 'stylus', 'templates', 'assets']);

gulp.task('watch', [ 'build' , 'browser-sync'], function() {
  gulp.watch('./components/**/*.jade', ['templates', reload] );
  gulp.watch('./styles/*.styl', ['stylus']);
  gulp.watch('./components/**/*.styl', ['stylus']);
});
