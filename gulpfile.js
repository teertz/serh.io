var Gulp         = require('gulp'),
    Plumber      = require('gulp-plumber'),
    CSSComb      = require('gulp-csscomb'),
    SASS         = require('gulp-sass'),
    CSSMin       = require('gulp-clean-css'),
    Concat       = require('gulp-concat'),
    Uglify       = require('gulp-uglify'),
    Autoprefixer = require('gulp-autoprefixer'),
    Watch        = require('gulp-watch'),
    BrowserSync  = require('browser-sync').create();


/* SCSS task */
Gulp.task('css', function() {

    return Gulp.src(['./sources/scss/*.scss'])
               .pipe(Plumber({errorHandler: function (err) { console.log(err); this.emit('end');}}))
               .pipe(SASS())
               .pipe(Autoprefixer({browsers: ['last 10 versions'], cascade: false}))
               .pipe(CSSComb())
               .pipe(CSSMin())
               .pipe(BrowserSync.stream())
               .pipe(Gulp.dest('assets/css'));

});


/* JS Task */
Gulp.task('js', function() {

    return Gulp.src(['./sources/js/*.js'])
               .pipe(Plumber({errorHandler: function (err) { console.log(err); this.emit('end');}}))
               .pipe(Uglify())
               .pipe(BrowserSync.stream())
               .pipe(Gulp.dest('assets/js'));

});


/* Gulp Watch + LiveReload */
Gulp.task('watch', function() {

    BrowserSync.init({server: "./", notify: false});

    Gulp.watch('sources/scss/*.scss', ['css'])
        .on('change', BrowserSync.reload);

    Gulp.watch('sources/js/*.js', ['js'])
        .on('change', BrowserSync.reload);

    Gulp.watch('*.html')
        .on('change', BrowserSync.reload);

});


/* Default task */
Gulp.task('default', ['css', 'js']);