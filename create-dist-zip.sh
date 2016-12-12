#!/usr/bin/env bash

pathToResult="./dist.zip"

echo "clear dist folder"
rm -r ./dist/

echo "run gulp default"
./node_modules/gulp/bin/gulp.js default;

echo "Zip dir"
zip -r -9 -q $pathToResult ./dist/

echo "Add zip file to git"
git add $pathToResult

echo "See into ${pathToResult}"
