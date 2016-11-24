const path = require('path');

const gulp = require('gulp');

const clean = require('gulp-rimraf');

const dot = require('dot');
const template = require('gulp-dot-template');
const prettifyHtml = require('gulp-html-prettify');

const cssimport = require('gulp-cssimport');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const tinypng = require('gulp-tinypng');
const server = require('gulp-server-livereload');

const rootFolder = 'www';
const rootIndexHtmlFolder = path.join(rootFolder, 'pages');
const distFolder = 'dist';
const distIndexHtmlFolder = path.join(distFolder, 'pages');
const staticFolders = ['image', 'i', 'font'];

const readFiles = require('./gulp/my-gulp-util').readFiles;

gulp.task('clean', function () {
    return gulp.src(path.join(distFolder, '**', '*'), {read: false})
        .pipe(clean({force: true}));
});


gulp.task('dot', function (cb) {

    readFiles(path.join(rootFolder, 'chunks'), {test: /\.dot$/})
        .then(chunks =>
            gulp.src(path.join(rootIndexHtmlFolder, '*.html'))
                .pipe(template({chunks, dot}))
                .pipe(gulp.dest(distIndexHtmlFolder))
                .on('end', cb)
        );

});

gulp.task('prettify-html', function () {
    return gulp.src(path.join(distIndexHtmlFolder, '*.html'))
        .pipe(prettifyHtml({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest(distIndexHtmlFolder));
});

gulp.task('html', gulp.series('dot', 'prettify-html'));

gulp.task('watch:html', function () {
    gulp.watch([path.join(rootFolder, '**', '*.html'), path.join(rootFolder, '**', '*.dot')], gulp.series('html'));
});


gulp.task('import-css', function () {
    return gulp.src(path.join(rootFolder, 'css', 'main.scss'))
        .pipe(cssimport({}))
        .pipe(gulp.dest(path.join(distFolder, 'css')));
});

gulp.task('sass', function () {
    return gulp.src(path.join(distFolder, 'css', 'main.scss'))
        .pipe(clean({force: true}))
        .pipe(sass())
        .pipe(gulp.dest(path.join(distFolder, 'css')));
});


gulp.task('autoprefix', function () {
    return gulp.src(path.join(distFolder, 'css', 'main.css'))
        .pipe(autoprefixer({
            browsers: ['last 4 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
        .pipe(gulp.dest(path.join(distFolder, 'css')));
});

gulp.task('css', gulp.series('import-css', 'sass', 'autoprefix'));

gulp.task('watch:css', function () {
    gulp.watch(path.join(rootFolder, '**', '*.scss'), gulp.series('css'));
});


gulp.task('js', function () {
    return gulp.src(path.join(rootFolder, 'js', '**', '*')).pipe(gulp.dest(path.join(distFolder, 'js')));
});

gulp.task('watch:js', function () {
    gulp.watch(path.join(rootFolder, 'js', '**', '*'), gulp.series('js'));
});


gulp.task('copy-data', function () {
    return Promise
        .all(staticFolders.map(folder => {
                return new Promise((resolve, reject)=> {
                    gulp
                        .src(path.resolve(rootFolder, folder, '**', '*'))
                        .pipe(gulp.dest(path.resolve(distFolder, folder)))
                        .on('end', resolve)
                        .on('error', reject);
                })
            })
        )
});

gulp.task('watch:copy-data', function () {
    gulp.watch(
        staticFolders.map(folder => path.resolve(rootFolder, folder, '**', '*')),
        gulp.series('copy-data')
    );
});


gulp.task('default', gulp.parallel('html', 'css', 'js', 'copy-data'));
gulp.task('watch', gulp.series('default', gulp.parallel('watch:html', 'watch:css', 'watch:js', 'watch:copy-data')));


gulp.task('tiny-png', function () {
    return gulp.src(['www/image/**/*'])
        .pipe(tinypng('f8ZqkiaR5hwI9QRdc8Dwropue4kENmRp')) // done 7 march
        // h0DW7VyYVXnl3awj2o7v9wXR-EavOiB5 - kidmathgenius@gmail.com
        // eSu5nMg0TSDairQWQC_Bx0h41PxKgKEp - mikhail.anisimau.play@gmail.com
        // f8ZqkiaR5hwI9QRdc8Dwropue4kENmRp - dmitry.turovtsov@gmail.com
        // _JsmPE63lCa9UsS45vlKWMlhBhRntoK8 - logikaismekalka@gmail.com
        // uY9x_ytUQ0sq9-bB8iTvwGnmiWVci4an - web.best.master@gmail.com
        // RmSQIT1W2KC2_gZf27_KaZ7GWIzpmKJu - ae.fan.game@gmail.com
        .pipe(gulp.dest('tinypng-dist'));
});


gulp.task('webserver', function() {
    gulp.src('./dist/')
        .pipe(server({
            livereload: false,
            directoryListing: false,
            open: false,
            host: '0.0.0.0',
            port: 8080,
            log: 'debug'
        }));
});
