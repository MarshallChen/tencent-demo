var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var sourceMap = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var watchify = require('watchify');

var dependencies = [
  'react/addons',
  'flux',
  'jquery',
  'lodash',
  'events',
  'react-bootstrap'
];

var files = [
  './static/js/app.js'
];

var createBundle = function (options) {

  var bundler = browserify({
    entries: options.input,
    debug: true,
    transform: [reactify],
    cachePackage: {},
    fullPaths: false
  });

  // (global.isWatching ? dependencies : []).forEach(function(dep) {
  //   bundler.external(dep);
  // });

  var rebundle = function() {
    var startTime = (new Date()).getTime();
    var fileName = options.input.substr(options.input.lastIndexOf('/') + 1);
    bundler.bundle()
      .on('error', function() { console.log(arguments); })
      .pipe(sourceMap(fileName))
      .pipe(gulpif(!global.isWatching, streamify(uglify())))
      .pipe(gulp.dest(global.dest))
      .on('end', function() {
        time = ((new Date()).getTime() - startTime) / 1000;
        console.log(fileName + ' 已打包完成！用时 ' + time + '秒');
      });
  };

  if (global.isWatching) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  rebundle();

};

var createBundles = function(bundles) {
  bundles.forEach(function (bundle) {
    createBundle({
      input: bundle
    });
  });
};

var bundleVendors = function() {
  var vendorsBundler = browserify({
    debug: false,
    require: dependencies
  });

  var start = new Date();
  vendorsBundler.bundle()
    .on('error', gutil.log)
    .pipe(sourceMap('vendors.js'))
    .pipe(gulpif(!global.isWatching, streamify(uglify())))
    .pipe(gulp.dest(global.dest))
    .pipe(notify(function() {
      console.log('vendors.js 已打包完成！用时 ' + ((Date.now() - start) / 1000) + '秒');
    }));
};

gulp.task('browserify', function() {
  createBundles(files);
  // bundleVendors();
});

gulp.task('setWatch', function() {
  global.isWatching = true;
  global.dest = './static/js/dist/';
});

gulp.task('watch', ['setWatch', 'browserify']);
gulp.task('default', ['watch']);
