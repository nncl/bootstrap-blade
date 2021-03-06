var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-tinypng');
var tinypng = require('gulp-tinypng-compress');

// SASS
gulp.task('sass', function () {
  gulp.src('./resources/assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

// JS - CONCATENANDO ARQUIVOS [GULP CONCAT]
gulp.task('scripts', function() {
  return gulp.src('./resources/assets/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify({
      mangle : false
    }))
    .pipe(gulp.dest('./assets/js'));
});

gulp.task('concatjs', function(){
  return gulp.src([
    './resources/assets/bower_components/angularjs/angular.min.js',
    './resources/assets/bower_components/angular-route/angular-route.min.js',
    './resources/assets/bower_components/ngMask/dist/ngMask.min.js',
  ])
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('./assets/js'));
});

// WATCH SASS E JS
gulp.task('watch', function () {
  gulp.watch('./resources/assets/scss/**/*.scss', ['sass']);
  gulp.watch('./resources/assets/js/**/*.js', ['scripts']);
  gulp.watch('./resources/assets/js/services/*.js', ['scripts']);
  gulp.watch('./resources/assets/js/controllers/*.js', ['scripts']);
});

// TINY PNG - compactando imagens
gulp.task('tiny', function () {
  gulp.src('images/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: 'e-LFigXOJXuxlObKAsukPhYwjvwbRQBu',
      sigFile: 'images/.tinypng-sigs',
      log: true
    }))
    .pipe(gulp.dest('./assets/img'));
});

gulp.task('default', ['sass' , 'scripts']);
