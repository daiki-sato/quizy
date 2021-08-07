/**
 * Settings
 */

const settings = {
  baseDir: './public/',
  proxy: 'localhost:81',
  clean: true,
  scripts: true,
  styles: true,
  php: true,
  reload: true,
}

/**
 * Paths to project folders
 */
const paths = {
  input: 'src/',
  output: 'public/',
  scripts: {
    input: 'src/js/*',
    output: 'public/js/',
    minify: true
  },
  styles: {
    input: 'src/scss/**/*.{scss,sass}',
    output: 'public/css/',
    minify: false,
    order: 'alphabetical'
  },
  images: {
    input: 'src/img/**/*.+(jpg|jpeg|png|gif|svg)',
    output: 'public/img/'
  },
  php: {
    input: 'src/php/**/*.php',
    output: 'public/'
  },
}

/**
 * Gulp Packages
 */
// General
const { src, dest, watch, series, parallel } = require( 'gulp' )
const del = require( 'del' )
const flatmap = require( 'gulp-flatmap' )
const lazypipe = require( 'lazypipe' )
const rename = require( 'gulp-rename' )
const plumber = require( 'gulp-plumber' )
const notify = require( 'gulp-notify' )

// Styles
const sass = require( 'gulp-sass' )
const glob = require( 'gulp-sass-glob' )
const postcss = require( 'gulp-postcss' )
const autoprefixer = require( 'autoprefixer' )
const cssdeclsort = require( 'css-declaration-sorter' )
const cleanCSS = require( 'gulp-clean-css' )
const mqpacker = require( 'css-mqpacker' )
const header = require( 'gulp-header' )
const replace = require( 'gulp-replace' )

// Scripts
const concat = require( 'gulp-concat' )
const uglify = require( 'gulp-terser' )

// Images
const imagemin = require( 'gulp-imagemin' )
const mozjpeg = require( 'imagemin-mozjpeg' )
const pngquant = require( 'imagemin-pngquant' )
const imageminGif = require( 'imagemin-gifsicle' )
const imageminSvg = require( 'imagemin-svgo' )

// BrowserSync
const browserSync = require( 'browser-sync' )


const cleanOption = {
  format: {
    breaks: {
      afterAtRule: true,
      afterBlockBegins: true,
      afterBlockEnds: true,
      afterComment: true,
      afterProperty: true,
      afterRuleBegins: true,
      afterRuleEnds: true,
      beforeBlockEnds: true,
      betweenSelectors: true
    },
    breakWith: '\n',
    indentBy: 2,
    indentWith: 'space',
    spaces: {
      aroundSelectorRelation: true,
      beforeBlockBegins: true,
      beforeValue: true
    },
    wrapAt: false,
    semicolonAfterLastProperty: true
  },
  level: {
    2: {
      mergeSemantically: true,
    }
  }
}

if( paths.styles.minify ) {
  delete cleanOption.format
  cleanOption.level[1] = { specialComments: 0 }
}

/**
 * Build CSS ( Scss to CSS )
 */
const buildStyles = (done) => {
  if ( !settings.styles ) return done();

  return(
    src( paths.styles.input )
      .pipe(
        plumber({
          errorHandler: notify.onError('Error:<%= error.message %>')
        })
      )
      .pipe( glob() )
      .pipe(
        sass({
          outputStyle: paths.styles.minify ? 'compressed' : 'expanded'
        }).on( 'error', sass.logError )
      )
      .pipe(
        postcss([
          mqpacker(),
          cssdeclsort({ order: paths.styles.order }),
          autoprefixer({
              grid: true,
              cascade: false
          }),
        ])
      )
      .pipe( replace( /@charset "UTF-8";/g, '' ) )
      .pipe( header( '@charset "UTF-8";\n' ) )
      .pipe( cleanCSS( cleanOption ))
      .pipe( dest( paths.styles.output ))
  )
}

/**
 * Build Javascript
 */
const jsTasks = lazypipe()
  .pipe( dest, paths.scripts.output )
  .pipe( rename, {suffix: '.min'} )
  .pipe( uglify )
  .pipe( dest, paths.scripts.output );

const buildScripts = (done) => {
  if ( !settings.scripts ) return done();

  return src( paths.scripts.input )
    .pipe( flatmap( function (stream, file) {
      if ( file.isDirectory() ) {
        let suffix = ''

        src( file.path + '/*.js' )
          .pipe( concat(file.relative + suffix + '.js') )
          .pipe( jsTasks() )

        return stream
      }

      return stream.pipe( jsTasks() )
    })
  )
}

/**
 * Build images ( minify )
 */
const buildImages = (done) => {
  return(
    src( paths.images.input )
      .pipe(imagemin([
          pngquant({
              quality: [0.8, 0.9]
          }),
          mozjpeg({
              quality: 90,
              progressive: true
          }),
          imageminGif({
              interlaced: false,
              optimizationLevel: 3,
              colors: 180
          }),
          imageminSvg()
        ])
      )
      .pipe(dest( paths.images.output ))
  )
}

/**
 * Copy PHP files
 */
const copyFiles = (done) => {
  if (!settings.php) return done()

  return src( paths.php.input )
    .pipe( dest(paths.php.output) )
}

// Remove pre-existing content from output folders
const cleanDist = (done) => {
  if (!settings.clean) return done()

  del.sync( [paths.output] )

  return done()
}

/**
 * Browser sync
 */
const startServer = (done) => {
  if (!settings.reload) return done()

  browserSync.init({
    proxy: settings.proxy,
    baseDir: settings.baseDir
  })

  done()
}

// Reload the browser when files change
const reloadBrowser = (done) => {
  if (!settings.reload) return done()
  browserSync.reload()

  done()
}

// Watch for changes
const watchSource = (done) => {
  watch(paths.input, series( exports.default, reloadBrowser ))
  done()
}

// default
exports.default = series(
  parallel(
    buildScripts,
    buildStyles,
    buildImages,
    copyFiles
  )
);

// gulp watch
exports.watch = series(
  exports.default,
  startServer,
  watchSource
)

// gulp build
exports.build = series(
  cleanDist,
  parallel(
    buildScripts,
    buildStyles,
    buildImages,
    copyFiles
  )
);
