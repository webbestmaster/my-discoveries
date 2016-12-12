const fs = require('fs');
const path = require('path');

// util section
function _walk(dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    _walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

function walk(path) {
    return new Promise((resolve, reject) =>
        _walk(path, (err, result) =>
            err ? reject(err) : resolve(result)
        )
    );
}

function readFile(path) {

    return new Promise((resolve, reject) =>
        fs.readFile(path, 'utf8', (err, data) =>
            err ? reject(err) : resolve({path, data})
        )
    );
}

module.exports.readFiles = function readFiles(pathToFolder, {test = /[\s\S]+/}) {

    return walk(pathToFolder)
        .then(paths =>
            Promise.all(paths
                .filter(() => test.test)
                .map(readFile)
            )
        )
        .then(files => {
                var map = {};
                files.forEach(
                    file => {
                        var key = file.path
                            .replace(path.resolve(process.cwd(), pathToFolder), '')
                            .replace(path.sep, '');
                        map[key] = file.data;
                    }
                );
                return map;
            }
        );

};


/**
 * Wrap gulp streams into fail-safe function for better error reporting
 * Usage:
 * gulp.task('less', wrapPipe(function(success, error) {
 *   return gulp.src('less/*.less')
 *      .pipe(less().on('error', error))
 *      .pipe(gulp.dest('app/css'));
 * }));
 */

module.exports.wrapPipe = function wrapPipe(taskFn) {

    return function (done) {

        var onSuccess = function () {
            done();
        };

        var onError = function (err) {
            console.error(err.message);
            done();
        };

        // var onError = function (err) {
        //     done(err);
        // };

        var outStream = taskFn(onSuccess, onError);

        if (outStream && typeof outStream.on === 'function') {
            outStream.on('end', onSuccess);
        }

    }

};
