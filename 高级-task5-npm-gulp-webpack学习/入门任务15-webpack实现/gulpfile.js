// 载入模块
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
   // jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    //rename = require('gulp-rename'),
    clean = require('gulp-clean'),
   // concat = require('gulp-concat'),
    minhtml = require('gulp-htmlmin');
   // notify = require('gulp-notify'),
   // md5 = require('gulp-md5-plus');


// css任务
gulp.task('css', function() {
  gulp.src('dist/css/*').pipe(clean());
  return gulp.src('./www/src/css/*.css')
   //      .pipe(concat('merge.min.css'))
	       .pipe(minifycss())
    //     .pipe(md5(10, 'dist/index.html'))
	       .pipe(gulp.dest('dist/css/'));
});

// html任务
gulp.task('html', function(){
  return gulp.src('./www/src/index.html')
   	     .pipe(minhtml({collapseWhitespace: true}))
	     .pipe(gulp.dest('dist/'))
});

// js任务
/*gulp.task('js', function(){
  gulp.src('./dist/app.bundle.js')
     // .pipe(jshint())
     // .pipe(concat('merge.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js/'))
});
*/
/*
gulp.task('js-lib', function(){
  gulp.src('./dist/lib.bundle.js')
     // .pipe(jshint())
     // .pipe(concat('merge.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js/'))
});
*/
// img任务
gulp.task('img', function(){
  gulp.src('www/imgs/*.jpg')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/imgs'))
});

// clean任务
gulp.task('clear', function(){
  gulp.src('./dist/*', {read: false})
      .pipe(clean());
});

gulp.task('build', ['html', 'css','img']);

