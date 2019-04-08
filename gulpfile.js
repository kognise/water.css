var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();

var paths = {
    styles: {
        src: "src/**/*.scss",
        dest: "dist"
    },
    html: {
        src: "index.html"
    }
}

function style() {
    return(
        gulp.src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())
    );
}

exports.style = style;

function reload(){
    browserSync.reload();
}

function watch() {
    style();

    browserSync.init({
        server: {
            baseDir: "./",
        },
        startPath: "index.html"
    })

    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.html.src, reload)
}

exports.watch = watch;