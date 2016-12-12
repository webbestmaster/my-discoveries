const path = require('path');

const ip = require('ip');

const gulp = require('gulp');

const clean = require('gulp-rimraf');

const dot = require('dot');
const template = require('gulp-dot-template');
const prettifyHtml = require('gulp-html-prettify');

const cssimport = require('gulp-cssimport');
const sass = require('gulp-sass');
// const autoprefixer = require('gulp-autoprefixer');

const tinypng = require('gulp-tinypng');
const server = require('gulp-server-livereload');

const rootFolder = 'www';
const rootIndexHtmlFolder = path.join(rootFolder, 'pages');
const distFolder = 'dist';
const distIndexHtmlFolder = path.join(distFolder, 'pages');
const staticFolders = ['img', 'i', 'images', 'font', 'favicon'];

const readFiles = require('./gulp/my-gulp-util').readFiles;
const wrapPipe = require('./gulp/my-gulp-util').wrapPipe;

gulp.task('clean', function () {
    return gulp.src(path.join(distFolder, '**', '*'))
        .pipe(clean());
});

gulp.task('html', wrapPipe(function (success, error) {
    return readFiles(path.join(rootFolder, 'chunks'), {test: /\.dot$/})
        .then(chunks =>
            gulp.src(path.join(rootIndexHtmlFolder, '*.html'))
                .pipe(template({chunks, dot}).on('error', error))
                .pipe(prettifyHtml({indent_char: ' ', indent_size: 4}).on('error', error))
                .pipe(gulp.dest(distIndexHtmlFolder))
                .on('end', success)
        );
}));

gulp.task('watch:html', function () {
    gulp.watch([path.join(rootFolder, '**', '*.html'), path.join(rootFolder, '**', '*.dot')], gulp.series('html'));
});

gulp.task('watch:css', function () {
    gulp.watch([path.join(rootFolder, '**', '*.css'), path.join(rootFolder, '**', '*.scss')], gulp.series('css'));
});

gulp.task('watch:js', function () {
    gulp.watch([path.join(rootFolder, '**', '*.js')], gulp.series('js'));
});
gulp.task('watch:copy-data', function () {
    gulp.watch(staticFolders.map(folder => path.resolve(rootFolder, folder, '**', '*')), gulp.series('copy-data'));
});

gulp.task('css', wrapPipe(function (success, error) {
    return gulp.src(path.join(rootFolder, 'css', 'main', 'main.scss'))
        .pipe(cssimport({}).on('error', error))
        .pipe(sass().on('error', error))
        // .pipe(autoprefixer({
        //     browsers: ['last 4 version', 'safari 5', 'ie 8', 'opera 12.1', 'ios 6', 'android 4'],
        //     cascade: false
        // }).on('error', error))
        .pipe(gulp.dest(path.join(distFolder, 'css')));
}));

gulp.task('js', function () {
    return gulp.src(path.join(rootFolder, 'js', '**', '*')).pipe(gulp.dest(path.join(distFolder, 'js')));
});

gulp.task('copy-data', function () {
    return Promise
        .all(staticFolders.map(folder => {
                return new Promise((resolve, reject) => {
                    gulp
                        .src(path.resolve(rootFolder, folder, '**', '*'))
                        .pipe(gulp.dest(path.resolve(distFolder, folder)))
                        .on('end', resolve)
                        .on('error', reject);
                })
            })
        );
});

gulp.task('default', gulp.parallel('html', 'css', 'js', 'copy-data'));
gulp.task('watch', gulp.series('default', gulp.parallel('watch:html', 'watch:css', 'watch:js', 'watch:copy-data')));


gulp.task('tiny-png', function () {
    return gulp.src(['www/img/**/*'])
        .pipe(tinypng('f8ZqkiaR5hwI9QRdc8Dwropue4kENmRp')) // done 7 march
        // h0DW7VyYVXnl3awj2o7v9wXR-EavOiB5 - kidmathgenius@gmail.com
        // eSu5nMg0TSDairQWQC_Bx0h41PxKgKEp - mikhail.anisimau.play@gmail.com
        // f8ZqkiaR5hwI9QRdc8Dwropue4kENmRp - dmitry.turovtsov@gmail.com
        // _JsmPE63lCa9UsS45vlKWMlhBhRntoK8 - logikaismekalka@gmail.com
        // uY9x_ytUQ0sq9-bB8iTvwGnmiWVci4an - web.best.master@gmail.com
        // RmSQIT1W2KC2_gZf27_KaZ7GWIzpmKJu - ae.fan.game@gmail.com
        .pipe(gulp.dest('tinypng-dist'));
});


gulp.task('webserver', function () {

    var port = '8080';

    console.log('Server started on http://' + ip.address() + ':' + port + '/');
    console.log('Try to open http://' + ip.address() + ':' + port + '/pages/');

    return gulp.src('./dist/')
        .pipe(server({
            livereload: false,
            directoryListing: false,
            open: false,
            host: '0.0.0.0',
            port: port,
            log: 'debug'
        }));

});
