const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const sourcemaps = require('gulp-sourcemaps')
const bytediff = require('gulp-bytediff')
const browserSync = require('browser-sync').create()
const chalk = require('chalk');

const paths = {
  styles: {
    src: 'src/**/*.scss',
    dest: 'dist'
  },
  html: {
    src: 'index.html'
  }
}

// https://stackoverflow.com/a/20732091
function humanFileSize(size) {
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

function formatByteMessage(source, data){
  var change = (data.savings > 0 ? 'saved' : 'gained');
  var prettySavings = humanFileSize(Math.abs(data.savings));
  var prettyStartSize = humanFileSize(data.startSize);
  var prettyEndSize = humanFileSize(data.endSize);

  if(data.endSize > data.startSize){
    prettyEndSize = chalk.yellow(prettyEndSize);
  }

  if(data.endSize < data.startSize){
    prettyEndSize = chalk.green(prettyEndSize);
  }

  return `${chalk.cyan(source.padStart(12, ' '))}: ${data.fileName} ${change} ${prettySavings} (${prettyStartSize} -> ${prettyEndSize})`
}

function style() {
  return (
    gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(bytediff.start())
        .pipe(postcss([ autoprefixer()]))
        .pipe(bytediff.stop((data) => formatByteMessage("autoprefixer", data)))
        .pipe(bytediff.start())
        .pipe(postcss([cssnano()]))
        .pipe(bytediff.stop((data) => formatByteMessage("cssnano", data)))
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