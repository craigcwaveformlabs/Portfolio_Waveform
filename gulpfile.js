'use strict';

// require

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
 connect = require('gulp-connect'),
  prefix = require('gulp-autoprefixer');;


// clean
gulp.task('clean', function() {
  del(['dist', 'css/styles*.css*', 'js/app*.js*']);
});

// JS - Concat
gulp.task("concatScripts", function() {
  return gulp.src([
    "js/jquery-1.11.2.min.js",
    "js/plugin/jquery.easing.js",
    "js/jquery-ui.min.js",
    "js/bootstrap.min.js",
    "js/plugin/jquery.flexslider.js",
    "js/plugin/background-check.min.js",
    "js/plugin/jquery.fitvids.js",
    "js/plugin/jquery.viewportchecker.js",
    "js/plugin/jquery.stellar.min.js",
    "js/plugin/wow.min.js",
    "js/plugin/jquery.colorbox-min.js",
    "js/plugin/owl.carousel.min.js",
    "js/plugin/isotope.pkgd.min.js",
    "js/plugin/masonry.pkgd.min.js",
    "js/plugin/imagesloaded.pkgd.min.js",
    "js/plugin/jPushMenu.js",
    "js/plugin/jquery.fs.tipper.min.js",
    "js/plugin/mediaelement-and-player.min.js",
    "js/plugin/jquery.validate.min.js",
    "js/theme.js",
    "js/navigation.js",
    "js/plugin/jquery.mb.YTPlayer.min.js",
    "js/plugin/jquery.singlePageNav.js",
    "js/contact-form.js",
    "js/plugin/mapGoogle.js",
    "js/map.js",
    "js/plugin/TweenLite.min.js",
    "js/plugin/EasePack.min.js",
    "js/plugin/pollyfill.js",
    "js/plugin/jquery.simple-text-rotator.min.js"
    ])
  .pipe(maps.init())
  .pipe(concat("app.js"))
  .pipe(maps.write('.'))
  .pipe(gulp.dest("js"))
});

// JS - Minify
gulp.task("minifyJS", ["concatScripts"], function() {
  return gulp.src("js/app.js")
      .pipe(uglify())
      .pipe(rename('app-min.js'))
      .pipe(gulp.dest('js'))
});


// CSS - Concat
gulp.task("concatCss", function(){
  return gulp.src([
    "css/style.css",
    "css/bootstrap.css",
    "css/font-awesome.css",
    "css/ionicons.css",
    "css/plugin/jPushMenu.css",
    "css/plugin/animate.css",
    "css/jquery-ui.css",
    "css/plugin/YTPlayer.css",
    "css/custom.css"
    ])
  .pipe(maps.init())
  .pipe(concat("styles.css"))
  .pipe(maps.write('.'))
  .pipe(gulp.dest("css"))
});

// CSS - Minify
gulp.task('minifyCSS', ["concatCss"], function() {
  return gulp.src("css/styles.css")
      .pipe(minCss())
      .pipe(rename('styles-min.css'))
      .pipe(gulp.dest('css'))
});

// Watch
gulp.task('watchFiles', function(){
  gulp.watch(['css/**/*.css'], ['minifyCSS']);
  gulp.watch('js/*.js', ['minifyJS']);
});


// Copy to dist folder - only copies.
gulp.task("distribute", function() {
  return gulp.src(['css/styles-min.css', 'js/app-min.js', '*.html',
                  'img/**', 'fonts/**'], {base: './'})
            .pipe(gulp.dest('dist'));
});

// Build
gulp.task("build", ["minifyCSS", "minifyJS"], function() {
  return gulp.src(['css/styles-min.css', 'js/app-min.js', '*.html',
                  'img/**', 'fonts/**'], {base: './'})
            .pipe(gulp.dest('dist'));
});

// Serve
gulp.task('serve', ['watchFiles'], function() {
  connect.server({port: 3000});
});

// Default Task
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
