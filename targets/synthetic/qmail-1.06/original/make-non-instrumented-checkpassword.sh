#!/bin/bash -e

cd `dirname $0`

export CC=gcc

cat << EOF > ./conf-cc
${CC} -g3 -std=gnu89 -O2


This will be used to compile .c files.
EOF

echo "\${CC} -g3" > ./conf-ld

make clean
make
