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

function dev(){

    function runImage(){
        return gulp.src(Config.img.src)
        .pipe(gulp.dest(Config.img.dist))
    }

    function runSass(){
        return gulp.src(Config.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(Config.sass.dist));
    }

    function runJs(){
        return gulp.src(Config.js.src)
        .pipe(bable())
        .pipe(gulp.dest(Config.js.dist));
    }

    function runScripts(done){
        let page_lib = [
            {
                "name": "index",
                "lib": ["./src/scripts/jquery.min.js"]
            }
        ]
        if (page_lib >= 1) {
            function output_loop(key){
                return gulp.src(page_lib[key].lib)
                .pipe(concat({
                    path: page_lib[key].name + ".lib.js",
                    stat: { mode: 0666 }
                }))
                .pipe(gulp.dest(Config.scripts.dist));
            }
            for( var i in page_lib ){
                output_loop(i);
            }
        }
        done();
    }

    // function runScripts(){
    //     return gulp.src(Config.scripts.src)
    //     .pipe(gulp.dest(Config.scripts.dist))
    // }

    function watch(){
        gulp.watch(Config.sass.src,gulp.series(runSass));
        gulp.watch(Config.js.src,gulp.series(runJs));
        gulp.watch(Config.img.src,gulp.series(runImage));
        gulp.watch(Config.scripts.src,gulp.series(runScripts));
    }

    gulp.task('dev',gulp.series(runImage,runSass,runJs,runScripts,gulp.parallel(watch)),function(done){
        done();
    })

}

module.exports = dev;