#!/usr/bin/env bash

folder="./backstop/backstop_data/"

sudo chmod -R 777 $folder
rm -r $folder

echo "$folder is clean"