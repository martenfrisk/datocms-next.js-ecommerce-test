#!/bin/bash

input_dir="$1"

if [[ -z "$input_dir" ]]; then
	echo "Please enter input directory."
	exit 1
fi

for img in $( find $input_dir -type f -iname "*.jpg");
do
	npx @squoosh/cli --mozjpeg auto -d public/images/normal $img
done