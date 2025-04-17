#!/bin/bash -e

cd `dirname $0`

echo "\${CC} -g3 -std=gnu89 -O2" > ./conf-cc
echo "\${CC} -g3" > ./conf-ld

make clean
CC=gcc make
cp qmail-popup qmail-popup.ori
