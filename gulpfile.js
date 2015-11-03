var gulp = require('gulp'),
        runSequence = require('run-sequence'),
        clean = require('gulp-rimraf'),
        copy = require('gulp-copy'),
        less = require('gulp-less'),
        concat = require('gulp-concat'),
        jshint = require('gulp-jshint'),
        autoprefixer = require('gulp-autoprefixer'),
        minifyCss = require('gulp-minify-css'),
        uglify = require('gulp-uglify'),
        imagemin = require('gulp-imagemin'),
        pngquant = require('imagemin-pngquant'),
        watch = require('gulp-watch');

/*
 * Clear
 */
gulp.task('clear:admin', function () {
    return gulp.src('./_dev/admin/css/*.css', {read: false}).pipe(clean());
});
gulp.task('clear:site', function () {
    return gulp.src('./_dev/site/css/*.css', {read: false}).pipe(clean());
});
gulp.task('clear:global:css', function () {
    return gulp.src('./_dev/global/css/*.css', {read: false}).pipe(clean());
});
gulp.task('clear:global:js', function () {
    return gulp.src([
        './_dev/global/js/all.js',
        './_dev/global/js/bootstrap.js',
        './_dev/global/js/jquery.js'
    ], {read: false}).pipe(clean());
});
gulp.task('clear:build:css', function () {
    return gulp.src('./_dev/build/**/*.css', {read: false}).pipe(clean());
});
gulp.task('clear:build:js', function () {
    return gulp.src('./_dev/build/**/*.js', {read: false}).pipe(clean());
});
gulp.task('clear:minify:admin:css', function () {
    return gulp.src('./admin/css/*.css', {read: false}).pipe(clean());
});
gulp.task('clear:minify:admin:js', function () {
    return gulp.src('./admin/js/*.js', {read: false}).pipe(clean());
});
gulp.task('clear:minify:site:css', function () {
    return gulp.src('./css/*.css', {read: false}).pipe(clean());
});
gulp.task('clear:minify:site:js', function () {
    return gulp.src('./js/*.js', {read: false}).pipe(clean());
});
gulp.task('clear:minify', ['clear:minify:admin:css', 'clear:minify:admin:js', 'clear:minify:site:css', 'clear:minify:site:js']);
gulp.task('clear:build', ['clear:build:css', 'clear:build:js']);
gulp.task('clear:global', ['clear:global:css', 'clear:global:js']);
gulp.task('clear:css', ['clear:admin', 'clear:site', 'clear:global', 'clear:build:css', 'clear:minify:css']);
gulp.task('clear:js', ['clear:global:js', 'clear:build:js', 'clear:minify:js']);
gulp.task('clear', ['clear:admin', 'clear:site', 'clear:global', 'clear:build', 'clear:minify']);

/*
 * Bower copy
 */
gulp.task('bower:css', function () {
    return gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css')
            .pipe(copy('./_dev/global/css', {prefix: 5}));
});
gulp.task('bower:js', function () {
    return gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js'
    ]).pipe(copy('./_dev/global/js', {prefix: 5}));
});
gulp.task('bower', ['bower:css', 'bower:js']);

/*
 * Less
 */
gulp.task('less:admin', function () {
    return gulp.src('./_dev/admin/css/*.less')
            .pipe(less())
            .pipe(gulp.dest('./_dev/admin/css'));
});
gulp.task('less:site', function () {
    return gulp.src('./_dev/site/css/*.less')
            .pipe(less())
            .pipe(gulp.dest('./_dev/site/css'));
});
gulp.task('less:global', function () {
    return gulp.src('./_dev/global/css/*.less')
            .pipe(less())
            .pipe(gulp.dest('./_dev/global/css'));
});
gulp.task('less', ['less:global', 'less:admin', 'less:site']);

/*
 * Auto prefixer
 */
gulp.task('prefix:admin', function () {
    return gulp.src('./_dev/admin/css/*.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })).pipe(gulp.dest('./_dev/admin/css'));
});
gulp.task('prefix:site', function () {
    return gulp.src('./_dev/site/css/*.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })).pipe(gulp.dest('./_dev/site/css'));
});
gulp.task('prefix:global', function () {
    return gulp.src('./_dev/global/css/global.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })).pipe(gulp.dest('./_dev/global/css'));
});
gulp.task('prefix', ['prefix:global', 'prefix:admin', 'prefix:site']);

/*
 * Concat site CSS & JS
 */
// CSS
gulp.task('concat:global:css', function () {
    return gulp.src([
        './_dev/global/css/bootstrap.css',
        './_dev/global/css/global.css'
    ]).pipe(concat('all.css')).pipe(gulp.dest('./_dev/global/css'));
});
gulp.task('concat:admin:css', function () {
    return gulp.src([
        './_dev/global/css/all.css',
        './_dev/admin/css/admin.css'
    ]).pipe(concat('style.min.css')).pipe(gulp.dest('./_dev/build/admin'));
});
gulp.task('concat:site:css', function () {
    return gulp.src([
        './_dev/global/css/all.css',
        './_dev/site/css/site.css'
    ]).pipe(concat('style.min.css')).pipe(gulp.dest('./_dev/build/site'));
});
// JS
gulp.task('concat:global:js', function () {
    return gulp.src([
        './_dev/global/js/jquery.js',
        './_dev/global/js/bootstrap.js',
        './_dev/global/js/script.js'
    ]).pipe(concat('all.js')).pipe(gulp.dest('./_dev/global/js'));
});
gulp.task('concat:site:js', function () {
    return gulp.src([
        './_dev/global/js/all.js',
        './_dev/site/js/*.js'
    ]).pipe(concat('style.min.js')).pipe(gulp.dest('./_dev/build/site'));
});
gulp.task('concat:admin:js', function () {
    return gulp.src([
        './_dev/global/js/all.js',
        './_dev/admin/js/*.js'
    ]).pipe(concat('style.min.js')).pipe(gulp.dest('./_dev/build/admin'));
});
gulp.task('concat:global', ['concat:global:css', 'concat:global:js']);
gulp.task('concat:admin', ['concat:admin:css', 'concat:admin:js']);
gulp.task('concat:site', ['concat:site:css', 'concat:site:js']);
gulp.task('concat', function (callback) {
    runSequence('concat:global', 'concat:admin', 'concat:site', callback);
});

/*
 * Minify CSS & JS
 */
// CSS
gulp.task('minify:admin:css', function () {
    return gulp.src('./_dev/build/admin/*.css')
            .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(gulp.dest('./admin/css'));
});
gulp.task('minify:site:css', function () {
    return gulp.src('./_dev/build/site/*.css')
            .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(gulp.dest('./css'));
});
// JS
gulp.task('minify:admin:js', function () {
    return gulp.src('./_dev/build/admin/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('./admin/js'));
});
gulp.task('minify:site:js', function () {
    return gulp.src('./_dev/build/site/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('./js'));
});
gulp.task('minify:admin', ['minify:admin:css', 'minify:admin:js']);
gulp.task('minify:site', ['minify:site:css', 'minify:site:js']);
gulp.task('minify', ['minify:admin', 'minify:site']);

/*
 * Minify images
 */
gulp.task('imagemin:admin', function() {
    return gulp.src('./_dev/admin/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./admin/img'));
});
gulp.task('imagemin:site', function() {
    return gulp.src('./_dev/site/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./img'));
});
gulp.task('imagemin', ['imagemin:admin', 'imagemin:site']);

/*
 * JS Hint
 */
gulp.task('jshint', function () {
    return gulp.src([
        './_dev/admin/js/*.js',
        './_dev/site/js/*.js',
        './_dev/global/js/script.js',
        './gulpfile.js'
    ]).pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('default', function (callback) {
    runSequence('clear', 'bower', 'less', 'prefix', 'concat', 'minify', 'imagemin', 'jshint', callback);
});

/*
 * Watch
 */
gulp.task('watch', function () {
    // Less
    gulp.watch('./_dev/global/css/global.less', ['less:global']);
    gulp.watch('./_dev/admin/css/admin.less', ['less:admin']);
    gulp.watch('./_dev/site/css/site.less', ['less:site']);
    // Concat CSS
    gulp.watch('./_dev/global/css/global.css', ['concat:global:css']);
    gulp.watch('./_dev/admin/css/admin.css', ['concat:admin:css']);
    gulp.watch('./_dev/site/css/site.css', ['concat:site:css']);
    // Concat JS
    gulp.watch('./_dev/global/js/script.js', ['concat:global:js', 'concat:admin:js', 'concat:site:js', 'jshint']);
    gulp.watch('./_dev/admin/js/script.js', ['concat:admin:js', 'jshint']);
    gulp.watch('./_dev/site/js/script.js', ['concat:site:js', 'jshint']);
    // Minify JS
    gulp.watch('./_dev/build/admin/*.js', ['minify:admin:js']);
    gulp.watch('./_dev/build/site/*.js', ['minify:site:js']);
    // Minify CSS
    gulp.watch('./_dev/build/admin/*.css', ['minify:admin:css']);
    gulp.watch('./_dev/build/site/*.css', ['minify:site:css']);
    // Images
    gulp.watch('./_dev/admin/img/**/*', ['imagemin:admin']);
    gulp.watch('./_dev/site/img/**/*', ['imagemin:site']);
});