const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const sourcemaps = require('gulp-sourcemaps')
const bytediff = require('gulp-bytediff')
const browserSync = require('browser-sync').create()
const chalk = require('chalk');
const rename = require('gulp-rename');
const filter = require('gulp-filter');

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

function formatByteMessage(source, data) {
  const change = (data.savings > 0 ? 'saved' : 'gained')
  const prettySavings = humanFileSize(Math.abs(data.savings))
  const prettyStartSize = humanFileSize(data.startSize)
  let prettyEndSize = humanFileSize(data.endSize)

  if (data.endSize > data.startSize) {
    prettyEndSize = chalk.yellow(prettyEndSize)
  }

  if (data.endSize < data.startSize) {
    prettyEndSize = chalk.green(prettyEndSize)
  }

  return `${chalk.cyan(source.padStart(12, ' '))}: ${data.fileName} ${change} ${prettySavings} (${prettyStartSize} -> ${prettyEndSize})`
}

function style() {
  return (
    gulp.src(paths.styles.src)
        // Add sourcemaps
        .pipe(sourcemaps.init())
        // Create a human readable sass file
        .pipe(sass({outputStyle: 'expanded'}))  
        // Catch any sass errors
        .on('error', sass.logError)
        // Calculate size before autoprefixing
        .pipe(bytediff.start()) 
        // autoprefix
        .pipe(postcss([ autoprefixer()])) 
        // Write the amount gained by autoprefixing
        .pipe(bytediff.stop((data) => formatByteMessage('autoprefixer', data))) 
        // Write the sourcemaps after making pre-minified changes
        .pipe(sourcemaps.write('.'))
        // Write pre-minified styles
        .pipe(gulp.dest(paths.styles.dest))
        // Remove sourcemaps from the pipeline, only keep css
        .pipe(filter('**/*.css'))
        // Calculate size before minifying
        .pipe(bytediff.start()) 
        // Minify using cssnano
        .pipe(postcss([cssnano()]))
        // Write the amount saved by minifying
        .pipe(bytediff.stop((data) => formatByteMessage('cssnano', data)))
        // Rename the files have the .min suffix
        .pipe(rename({suffix: '.min' }))
        // Write the sourcemaps after making all changes
        .pipe(sourcemaps.write('.'))
        // Write the minified files
        .pipe(gulp.dest(paths.styles.dest))
        // Stream any changes to browserSync
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