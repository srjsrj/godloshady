var lr = require('tiny-lr'),
    gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    connect = require('connect'),
    server = lr();

gulp.task('stylus', function() {
    gulp.src('./src/styl/main.styl')
        .pipe(stylus({
            use: ['nib']
        }))
    .on('error', console.log)
    .pipe(gulp.dest('./build/css/'))
    .pipe(livereload(server));
});

gulp.task('jade', function() {
    gulp.src(['./src/jade/*.jade', '!./src/jade/_*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .on('error', console.log)
    .pipe(gulp.dest('./build/'))
    .pipe(livereload(server));
});

gulp.task('http-server', function() {
    connect()
        .use(require('connect-livereload')())
        .use(connect.static('./build'))
        .listen('1234');

    console.log('Сервер доступен http://localhost:1234');
});

gulp.task('watch', function() {
    gulp.run('stylus');
    gulp.run('jade');

    server.listen(35729, function(err) {
        if (err) return console.log(err);

        gulp.watch('./src/styl/*.styl', function() {
            gulp.run('stylus');
        });
        gulp.watch('./src/jade/*.jade', function() {
            gulp.run('jade');
        });
    });
    gulp.run('http-server');
});