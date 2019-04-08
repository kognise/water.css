const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()

const paths = {
  styles: {
    src: 'src/**/*.scss',
    dest: 'dist'
  },
  html: {
    src: 'index.html'
  }
}

function style() {
  return (
    gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
  )
}

function reload() {
  browserSync.reload()
}

function watch() {
  style()

  browserSync.init({
    server: {
      baseDir: './',
    },
    startPath: 'index.html'
  })

  gulp.watch(paths.styles.src, style)
  gulp.watch(paths.html.src, reload)
}

module.exports.style = style
module.exports.watch = watch