import gulp from 'gulp'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import sourcemaps from 'gulp-sourcemaps'
import bytediff from 'gulp-bytediff'
import chalk from 'chalk'
import rename from 'gulp-rename'
import filter from 'gulp-filter'
import flatten from 'gulp-flatten'
import babel from 'gulp-babel'
import terser from 'gulp-terser'
import posthtml from 'gulp-posthtml'
import htmlnano from 'htmlnano'
import sizereport from 'gulp-sizereport'
import postcssCssVariables from 'postcss-css-variables'
import postcssImport from 'postcss-import'
import postcssInlineSvg from 'postcss-inline-svg'
import _browserSync from 'browser-sync'
import chalkTemplate from 'chalk-template'

const browserSync = _browserSync.create()

const paths = {
  docs: { src: 'docs/**/*', dest: 'out/docs' },
  styles: { src: 'src/builds/*.css', dest: 'out', watch: 'src/**/*.css' }
}

// https://stackoverflow.com/a/20732091
const humanFileSize = (size) => {
  const i = Math.floor(Math.log(size) / Math.log(1024))
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}

const formatByteMessage = (source, data) => {
  const prettyStartSize = humanFileSize(data.startSize)
  let message = ''

  if (data.startSize !== data.endSize) {
    const change = data.savings > 0 ? 'saved' : 'gained'
    const prettySavings = humanFileSize(Math.abs(data.savings))
    let prettyEndSize = humanFileSize(data.endSize)

    if (data.endSize > data.startSize) prettyEndSize = chalk.yellow(prettyEndSize)
    if (data.endSize < data.startSize) prettyEndSize = chalk.green(prettyEndSize)

    message = chalkTemplate`${change} ${prettySavings} (${prettyStartSize} -> {bold ${prettyEndSize}})`
  } else message = chalkTemplate`kept original filesize. ({bold ${prettyStartSize}})`

  return chalkTemplate`{cyan ${source.padStart(12, ' ')}}: {bold ${data.fileName}} ${message}`
}

const style = () => {
  const startDiff = () => bytediff.start()
  const endDiff = (source) => bytediff.stop((data) => formatByteMessage(source, data))

  return (
    gulp
      .src(paths.styles.src)
      .pipe(postcss([postcssImport(), postcssInlineSvg()]))

      .pipe(startDiff())
      .pipe(postcss([postcssCssVariables({ preserve: true })]))
      .pipe(endDiff('css variables'))

      .pipe(startDiff())
      .pipe(postcss([autoprefixer()]))
      .pipe(endDiff('autoprefixer'))

      .pipe(flatten()) // Put files in out/*, not out/builds/*
      .pipe(gulp.dest(paths.styles.dest))

      // <minifying>
      .pipe(startDiff())
      .pipe(postcss([cssnano({ preset: ['default', { svgo: { floatPrecision: 0 } }] })]))
      .pipe(endDiff('minification'))
      .pipe(rename({ suffix: '.min' }))
      // </minifying>

      .pipe(gulp.dest(paths.styles.dest))
      .pipe(gulp.dest(paths.docs.dest + '/water.css'))

      .pipe(sizereport({ gzip: true, total: false, title: 'SIZE REPORT' }))
      .pipe(browserSync.stream())
  )
}

const docs = () => {
  const htmlOnly = filter('**/*.html', { restore: true })
  const jsOnly = filter('**/*.js', { restore: true })
  const cssOnly = filter('**/*.css', { restore: true })

  return (
    gulp
      // Exclude all HTML files except for those ending with .html
      .src(paths.docs.src, { ignore: '**/!(*).html' })

      // * Process HTML *
      .pipe(htmlOnly)
      .pipe(posthtml([htmlnano()]))
      .pipe(htmlOnly.restore)

      // * Process JS *
      .pipe(jsOnly)
      .pipe(sourcemaps.init())
      .pipe(babel({ presets: ['@babel/preset-env'] }))
      .pipe(terser({ toplevel: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(jsOnly.restore)

      // * Process CSS *
      .pipe(cssOnly)
      .pipe(sourcemaps.init())
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write('.'))
      .pipe(cssOnly.restore)

      .pipe(gulp.dest(paths.docs.dest))
  )
}

const browserReload = (done) => {
  browserSync.reload()
  return done()
}

const startDevServer = () => {
  browserSync.init({ server: { baseDir: './out/docs' } })

  gulp.watch(paths.styles.watch, gulp.series(style, browserReload))
  gulp.watch(paths.docs.src, gulp.series(docs, browserReload))
}

export const build = gulp.parallel(style, docs)
export const watch = gulp.series(build, startDevServer)
