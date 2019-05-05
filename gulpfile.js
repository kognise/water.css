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
const flatten = require('gulp-flatten')
const postcssSassParser = require('postcss-scss')
const postcssCssVariables = require('postcss-css-variables')

const paths = {
  styles: {
    src: 'src/**/*.scss',
    variables: {
      src: 'src/variables-*.scss',
      compiled: 'src/_variables/_variables-*.scss',
      dest: 'src/_variables',
    },
    dest: 'dist'
  },
  html: {
    src: 'index.html'
  }
}

// https://stackoverflow.com/a/20732091
function humanFileSize(size) {
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

function formatByteMessage(source, data) {
  const prettyStartSize = humanFileSize(data.startSize)
  let message = '';

  if (data.startSize !== data.endSize) {
    const change = (data.savings > 0 ? 'saved' : 'gained')
    const prettySavings = humanFileSize(Math.abs(data.savings))
    let prettyEndSize = humanFileSize(data.endSize)

    if (data.endSize > data.startSize) prettyEndSize = chalk.yellow(prettyEndSize)
    if (data.endSize < data.startSize) prettyEndSize = chalk.green(prettyEndSize)

    message = chalk`${change} ${prettySavings} (${prettyStartSize} -> {bold ${prettyEndSize}})`
  } else message = chalk`kept original filesize. ({bold ${prettyStartSize}})`

  return chalk`{cyan ${(source.padStart(12, ' '))}}: {bold ${data.fileName}} ${message}`
}

/* Inlines variable references within the variable files themselves. */
/* Allows computing new variables based on previous ones, e.g. with `lighten()` */
function computeVariables() {
  const plugins = [postcssCssVariables({ preserve: 'computed' })]
  const parser = postcssSassParser

  return gulp.src(paths.styles.variables.src)
    .pipe(postcss(plugins, { parser }))
    .pipe(rename({ prefix: '_' }))
    .pipe(gulp.dest(paths.styles.variables.dest));
}

function compileStyles() {
  const isLegacyOrStandalone = path => /standalone|legacy/.test(path)

  const excludeModern = filter(file => isLegacyOrStandalone(file.path), { restore: true })
  const excludeLegacy = filter(file => !isLegacyOrStandalone(file.path), { restore: true })

  return (
    gulp.src(paths.styles.src, { ignore: paths.styles.variables.src })
      // Add sourcemaps
      .pipe(sourcemaps.init())
      // Create a human readable sass file
      .pipe(sass({ outputStyle: 'expanded' }))
      // Catch any sass errors
      .on('error', sass.logError)

      // * Process legacy & standalone builds *
      .pipe(excludeModern)
      // Inline variable values so CSS works in legacy browsers
      .pipe(postcss([postcssCssVariables()]))
      // Calculate size before autoprefixing
      .pipe(bytediff.start())
      // autoprefix
      .pipe(postcss([autoprefixer()]))
      // Write the amount gained by autoprefixing
      .pipe(bytediff.stop((data) => formatByteMessage('autoprefixer', data)))
      .pipe(excludeModern.restore)

      // * Process modern builds *
      .pipe(excludeLegacy)
      // Calculate size before autoprefixing
      .pipe(bytediff.start())
      // autoprefix modern builds
      // TODO: Use separate browserslist to only apply prefixes needed in *modern* browsers
      .pipe(postcss([autoprefixer()]))
      // Write the amount gained by autoprefixing
      .pipe(bytediff.stop((data) => formatByteMessage('autoprefixer', data)))
      .pipe(excludeLegacy.restore)

      // Write the sourcemaps after making pre-minified changes
      .pipe(sourcemaps.write('.'))
      // Flatten output so files end up in dist/*, not dist/builds/*
      .pipe(flatten())
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
      .pipe(rename({ suffix: '.min' }))
      // Write the sourcemaps after making all changes
      .pipe(sourcemaps.write('.'))
      // Write the minified files
      .pipe(gulp.dest(paths.styles.dest))
      // Stream any changes to browserSync
      .pipe(browserSync.stream())
  )
}

const style = gulp.series(computeVariables, compileStyles)

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

  // Don't watch compiled variables or every build triggers the watcher again (infinite loop)
  const watched = [paths.styles.src, `!${paths.styles.variables.compiled}`]

  gulp.watch(watched, style)
  gulp.watch(paths.html.src, reload)
}

module.exports.style = style
module.exports.watch = watch