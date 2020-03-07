//Подключаем модули галпа
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

sass.compiler = require("node-sass");

function scss_build() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream())
}

function html_build() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream())
}

//Просматривать файлы
function watch_files() {
   browserSync.init({
      server: {
          baseDir: "./build"
      },
       tunnel: false
  });
  //Следить за CSS файлами
  gulp.watch('./src/sass/**/*.sass', scss_build)
  //Следить за JS файлами
  gulp.watch('./src/*.html', html_build)
  //При изменении HTML запустить синхронизацию
  // gulp.watch("./*.html").on('change', browserSync.reload);
}

exports.build = watch_files;