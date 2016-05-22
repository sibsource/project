#!/bin/bash

if [ ! -f .install ]; then
  npm install grunt --save-dev
  npm install bower --dave-dev
  echo `date` >> .install
fi

bower install

npm install
