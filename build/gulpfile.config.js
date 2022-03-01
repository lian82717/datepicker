var SRC_DIR = './src/';
var DIST_DIR = './';
var DIST_FILES = DIST_DIR + '**';

var Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    html: {  
        dir: SRC_DIR,
        src: SRC_DIR + '*.{html,php}',  
        dist: DIST_DIR  
    },  
    assets: {  
        dir: SRC_DIR + 'assets',
        src: SRC_DIR + 'assets/**/*',
        dist: DIST_DIR + 'assets'
    },  
    css: {  
        dir: SRC_DIR + 'css',
        src: SRC_DIR + 'css/**/*.css',
        dist: DIST_DIR + 'css'
    },  
    sass: {  
        dir: SRC_DIR + 'sass',
        src: SRC_DIR + 'sass/**/*.scss',
        dist: DIST_DIR + 'css'
    },  
    js: {  dir: SRC_DIR + 'js',
        src: SRC_DIR + 'js/**/*.js',
        dist: DIST_DIR + 'js', 
        build_name: 'build.js'               
    },  
    img: {  
        dir: SRC_DIR + 'images',
        src: SRC_DIR + 'images/**/*',         
        dist: DIST_DIR + 'images'
    },  
    scripts: {  
        dir: SRC_DIR + 'scripts',
        src: SRC_DIR + 'scripts/**/*', 
        dist: DIST_DIR + 'scripts'
    }  
};

module.exports = Config;