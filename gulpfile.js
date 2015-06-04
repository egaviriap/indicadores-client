/**
 * Created by egaviria on 03/06/2015.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
//var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

var jsFiles = ["public/ind/assets/globals/*.js","public/ind/assets/*.js"];

gulp.task('sass', function () {
    gulp.src('./public/ind/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/ind/css'));
});

// Static server
//gulp.task('browser-sync', function() {
//    browserSync.init({
//        server: {
//            baseDir: "./"
//        }
//    });
//
//    gulp.watch("public/scss/*.scss", ['sass']);
//    gulp.watch(jsFiles, ['js']);
//});

gulp.task('js', function(){
    gulp.src(jsFiles)
        .pipe(concat('all.min.js', {newLine: ';'}))
        .pipe(gulp.dest("public/ind/lib/"));
});

gulp.task('default', ['sass', 'js'], function() {

});