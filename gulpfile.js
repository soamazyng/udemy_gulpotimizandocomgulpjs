var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var customizeBootstrap = require('gulp-customize-bootstrap');
var less = require('gulp-less');
var concat = require('gulp-concat');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss');
var imagemin = require('gulp-imagemin');

gulp.task('default', ['compileBootstrap', 'lib', 'js', 'imagem', 'watch', 'browser-sync']);

gulp.task('watch', function() {
  gulp.watch('./dev/styles/**/*', ['compileBootstrap']);
  gulp.watch('./dev/app/**/*', ['js']);
});

gulp.task('browser-sync', function() {
    
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", reload);
    gulp.watch("./dev/app/*.js").on("change", reload);
    gulp.watch("./dev/styles/less/*.less").on("change", reload);

});
 
gulp.task('compileBootstrap', function() {
	//console.log(__dirname); // obtem o caminho do diretorio do projeto
  return gulp.src('./node_modules/bootstrap/less/bootstrap.less')
    .pipe(customizeBootstrap('./dev/styles/less/*.less'))
    .pipe(less())
    .pipe(uglifycss())
    .pipe(rename({suffix: '.min'}))    
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('lib', function() {	
  return gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/angular/angular.min.js'])
   	.pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js', function() {	
  return gulp.src(['./dev/app/app.js', './dev/app/controllers.js'])
   	.pipe(concat('app.js'))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('imagem', function() {
    return gulp.src('./dev/imagens/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
});