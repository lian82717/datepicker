const gulp = require('gulp'),
    concat =require('gulp-concat'), //合併檔案
    cleanCSS = require('gulp-clean-css'), //壓縮css
    uglify = require('gulp-uglify'), //壓縮js
    rename = require('gulp-rename'), //重新命名檔案
    imagemin = require('gulp-imagemin'), //壓縮圖片
    bable = require('gulp-babel'), //轉換ES6
    sass = require('gulp-sass'), //sass轉換
    include = require('gulp-file-include'), //合併檔案
    autoprefixer = require('gulp-autoprefixer'), //prefix
    del = require('del'),
    Config = require('./gulpfile.config.js'),
    browserSync = require('browser-sync').create();
    sass.compiler = require('node-sass');

function pro(){
    del(['./']);

    function runHTML(){
        return gulp.src(Config.html.src)
        .pipe(gulp.dest(Config.html.dist))
    }

    function runCss(){
        return gulp.src(Config.css.src)
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest(Config.css.dist));
    }

    function runSass(){
        return gulp.src(Config.sass.src)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(Config.sass.dist));
    }

    function runJs(){
        return gulp.src(Config.js.src)
        .pipe(bable())
        .pipe(uglify())
        .pipe(gulp.dest(Config.js.dist));
    }

    function runAssets(){
        return gulp.src(Config.assets.src)
        .pipe(gulp.dest(Config.assets.dist));
    }

    gulp.task('pro',gulp.series(runHTML,runSass,runJs,runAssets),function(done){
        done();
    })
}

module.exports = pro;