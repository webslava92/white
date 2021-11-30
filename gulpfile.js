const { src, dest, watch, parallel } = require('gulp');

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const autoprefixer  = require('gulp-autoprefixer')
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-html-minifier");
const imagemin      = require('gulp-imagemin');
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const imageminOptipng = require("imagemin-optipng");
const rename = require('gulp-rename')
const browserSync   = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notofy: false
  })
}

function html() {
  return src("app/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("project"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/*.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(dest("app/assets/css"))
    .pipe(dest("project/assets/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src("app/js/main.js")
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(dest("app/assets/js"))
    .pipe(dest("project/assets/js"))
    .pipe(browserSync.stream());
}

function images(){
  return src("app/assets/img/*.*")
    .pipe(
      imagemin([
        imagemin.gifsicle(),
        imageminJpegRecompress({
          loops: 4,
          min: 50,
          max: 95,
          quality: "high",
        }),
        imagemin.optipng(),
        imagemin.svgo(),
      ])
    )
    .pipe(dest("project/assets/img"));
}

function watching() {
  watch(["app/**/*.*"], images);
  watch(["app/**/*.html"], html);
  watch(['app/scss/**/*.scss'], styles);
  watch(["app/js/**/*.js"], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}


exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.htmlmin = htmlmin;

exports.default = parallel(styles, scripts, browsersync, watching);