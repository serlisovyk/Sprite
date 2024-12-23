import gulp from 'gulp'
import fileInclude from 'gulp-file-include'
import server from 'gulp-server-livereload'
import clean from 'gulp-clean'
import fs from 'fs'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import changed from 'gulp-changed'
import svgsprite from 'gulp-svg-sprite'
import replace from 'gulp-replace'
import webpackStream from 'webpack-stream'
import * as sass from 'sass'
import gulpSass from 'gulp-sass'
import sourceMaps from 'gulp-sourcemaps'
import sassGlob from 'gulp-sass-glob'
const sassCompiler = gulpSass(sass)

const plumberNotify = title => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error <%= error.message %>',
      sound: false,
    }),
  }
}

gulp.task('clean:dev', function (done) {
  if (fs.existsSync('./build/')) {
    return gulp.src('./build/', { read: false }).pipe(clean({ force: true }))
  }
  done()
})

gulp.task('html:dev', function () {
  return gulp
    .src('./src/index.html')
    .pipe(changed('./build/', { hasChanged: changed.compareContents }))
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(
      replace(
        /(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(images|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        '$1./$4$5$7$1'
      )
    )
    .pipe(gulp.dest('./build/'))
})

gulp.task('scss:dev', function () {
  return gulp
    .src('./src/scss/style.scss')
    .pipe(changed('./build/'))
    .pipe(plumber(plumberNotify('SCSS')))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sassCompiler())
    .pipe(
      replace(
        /(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        '$1$2$3$4$6$1'
      )
    )
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./build/'))
})

gulp.task('js:dev', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./build/'))
    .pipe(plumber(plumberNotify('JS')))
    .pipe(webpackStream(import('./../webpack.config.js')))
    .pipe(gulp.dest('./build/'))
})

gulp.task('fonts:dev', function () {
  return gulp
    .src('./src/fonts/**/*')
    .pipe(changed('./build/fonts/'))
    .pipe(gulp.dest('./build/fonts/'))
})

gulp.task('images:dev', function () {
  return gulp
    .src('./src/images/**/*')
    .pipe(changed('./build/images/'))
    .pipe(gulp.dest('./build/images/'))
})

gulp.task('svgStack:dev', function () {
  return gulp
    .src('./src/images/svg/**/*.svg')
    .pipe(plumber(plumberNotify('SVG:dev')))
    .pipe(
      svgsprite({
        mode: {
          stack: {
            example: true,
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                js2svg: { indent: 4, pretty: true },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest('./build/images/svgsprite/'))
})

gulp.task('svgSymbol:dev', function () {
  return gulp
    .src('./src/images/svg/**/*.svg')
    .pipe(plumber(plumberNotify('SVG:dev')))
    .pipe(
      svgsprite({
        mode: {
          symbol: {
            sprite: '../sprite.symbol.svg',
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                js2svg: { indent: 4, pretty: true },
                plugins: [
                  {
                    name: 'removeAttrs',
                    params: {
                      attrs: '(fill|stroke)',
                    },
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest('./build/images/svgsprite/'))
})

gulp.task('server:dev', function () {
  return gulp.src('./build/').pipe(server({ livereload: true, open: true }))
})

gulp.task('watch:dev', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss:dev'))
  gulp.watch(['./src/index.html', './src/html/**/*.json'], gulp.parallel('html:dev'))
  gulp.watch('./src/js/*.js', gulp.parallel('js:dev'))
  gulp.watch('./src/images/**/*', gulp.parallel('images:dev'))
  gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'))
  gulp.watch('./src/images/svg/*', gulp.series('svgStack:dev', 'svgSymbol:dev'))
})
