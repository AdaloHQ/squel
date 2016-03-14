const gulp = require('gulp'),
  path = require('path'),
  concat = require('gulp-concat'),
  insert = require('gulp-insert'),
  mocha = require('gulp-mocha'),
  babel = require('gulp-babel'),
  replace = require('gulp-replace'),
  uglify = require('gulp-uglify'),
  runSequence = require('run-sequence');


const SQUEL_VERSION = require('./package.json').version;


gulp.task('build-basic', function() {

  return gulp.src([
      './src/umd-header.js',
      './src/core.js',
      './src/umd-footer.js',
    ])
    .pipe( concat('squel-basic.js') )
    .pipe( replace(/<<VERSION_STRING>>/i, SQUEL_VERSION) )
    .pipe( babel({
      presets: ['es2015']
    }) )
    .pipe( gulp.dest('./') )
    .pipe( uglify() )
    .pipe( insert.prepend('/*! squel | https://github.com/hiddentao/squel | BSD license */') )
    .pipe( concat('squel-basic.min.js') )
    .pipe( gulp.dest('./') )
});


gulp.task('build-full', function() {
  return gulp.src([
      './src/umd-header.js',
      './src/core.js',
      './src/mssql.js',
      './src/posgres.js',
      './src/mysql.js',
      './src/umd-footer.js',
    ])
    .pipe( concat('squel.js') )
    .pipe( replace(/<<VERSION_STRING>>/i, SQUEL_VERSION) )
    .pipe( babel({
      presets: ['es2015']
    }) )
    .pipe( gulp.dest('./') )
    .pipe( uglify() )
    .pipe( insert.prepend('/*! squel | https://github.com/hiddentao/squel | BSD license */') )
    .pipe( concat('squel.min.js') )
    .pipe( gulp.dest('./') )
});



gulp.task('tests', ['build-basic', 'build-full'], function () {
  return gulp.src([
      './test/baseclasses.test.coffee',
      './test/blocks.test.coffee',
      './test/case.test.coffee',
      './test/custom.test.coffee',
      './test/delete.test.coffee',
      './test/expressions.test.coffee',
      './test/insert.test.coffee',
      './test/select.test.coffee',
      './test/testbase.test.coffee',
      './test/update.test.coffee'
    ], { read: false })
      .pipe(mocha({
        ui: 'exports',
        reporter: 'spec'
      }))
    ;
});


gulp.task('default', ['tests']);



