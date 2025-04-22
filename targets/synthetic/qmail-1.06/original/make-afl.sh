#!/bin/bash

cd `dirname $0`

echo "\${CC} -g3 -std=gnu89 -O2" > ./conf-cc
echo "\${CC} -g3" > conf-ld

make clean
rm -f qmail-popup.lto.afl
rm -f qmail-popup.lto.cmplog
rm -f qmail-popup.laf-intel.afl
CC=afl-clang-lto LD=afl-clang-lto make
cp qmail-popup qmail-popup.lto.afl
make clean
AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto make
cp qmail-popup qmail-popup.lto.cmplog
make clean
AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast LD=afl-clang-fast make
cp qmail-popup qmail-popup.laf-intel.afl
