.DEFAULT_GOAL := all

.PHONY: safe safe-afl backdoored backdoored-afl ground-truth ground-truth-afl clean all all-afl

safe:
	mkdir -p ./safe
	rm -rf ./safe/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./safe/
	patch ./safe/proftpd/contrib/mod_copy.c ./patches/safe-mod_copy.c.patch
	patch ./safe/proftpd/tests/t/lib/ProFTPD/Tests/Modules/mod_copy.pm ./patches/safe-mod_copy.pm.patch
	cd ./safe/proftpd && CC=gcc LD=gcc ./configure --with-modules=mod_copy
	CC=gcc LD=gcc make -C ./safe/proftpd
	cp ./safe/proftpd/proftpd ./safe/proftpd.ori

safe-afl:
	mkdir -p ./safe
	rm -rf ./safe/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./safe/
	patch ./safe/proftpd/contrib/mod_copy.c ./patches/safe-mod_copy.c.patch
	patch ./safe/proftpd/tests/t/lib/ProFTPD/Tests/Modules/mod_copy.pm ./patches/safe-mod_copy.pm.patch
	cd ./safe/proftpd && CC=afl-clang-lto LD=afl-clang-lto ./configure --with-modules=mod_copy
	CC=afl-clang-lto LD=afl-clang-lto make -C ./safe/proftpd
	cp ./safe/proftpd/proftpd ./safe/proftpd.lto.afl
	rm -rf ./safe/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./safe/
	cd ./safe/proftpd && CC=afl-clang-lto LD=afl-clang-lto ./configure --with-modules=mod_copy
	AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto make -C ./safe/proftpd
	cp ./safe/proftpd/proftpd ./safe/proftpd.lto.cmplog
	rm -rf ./safe/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./safe/
	cd ./safe/proftpd && CC=afl-clang-fast LD=afl-clang-fast ./configure --with-modules=mod_copy
	AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast LD=afl-clang-fast make -C ./safe/proftpd
	cp ./safe/proftpd/proftpd ./safe/proftpd.laf-intel.afl

backdoored:
	mkdir -p ./backdoored
	rm -rf ./backdoored/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./backdoored/
	cd ./backdoored/proftpd && CC=gcc LD=gcc ./configure --with-modules=mod_copy
	CC=gcc LD=gcc make -C ./backdoored/proftpd
	cp ./backdoored/proftpd/proftpd ./backdoored/proftpd.ori

backdoored-afl:
	mkdir -p ./backdoored
	rm -rf ./backdoored/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./backdoored/
	cd ./backdoored/proftpd && CC=afl-clang-lto LD=afl-clang-lto ./configure --with-modules=mod_copy
	CC=afl-clang-lto LD=afl-clang-lto make -C ./backdoored/proftpd
	cp ./backdoored/proftpd/proftpd ./backdoored/proftpd.lto.afl
	rm -rf ./backdoored/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./backdoored/
	cd ./backdoored/proftpd && CC=afl-clang-lto LD=afl-clang-lto ./configure --with-modules=mod_copy
	AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto make -C ./backdoored/proftpd
	cp ./backdoored/proftpd/proftpd ./backdoored/proftpd.lto.cmplog
	rm -rf ./backdoored/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./backdoored/
	cd ./backdoored/proftpd && CC=afl-clang-lto LD=afl-clang-lto ./configure --with-modules=mod_copy
	AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast LD=afl-clang-fast make -C ./backdoored/proftpd
	cp ./backdoored/proftpd/proftpd ./backdoored/proftpd.laf-intel.afl

ground-truth:
	mkdir -p ./ground-truth
	rm -rf ./ground-truth/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./ground-truth/
	patch ./ground-truth/proftpd/contrib/mod_copy.c ./patches/ground_truth-mod_copy.c.patch
	cd ./ground-truth/proftpd && CC=gcc LD=gcc ./configure --with-modules=mod_copy
	CC=gcc LD=gcc make -C ./ground-truth/proftpd
	cp ./ground-truth/proftpd/proftpd ./ground-truth/proftpd.ori

ground-truth-afl:
	mkdir -p ./ground-truth
	rm -rf ./ground-truth/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./ground-truth/
	patch ./ground-truth/proftpd/contrib/mod_copy.c ./patches/ground_truth-mod_copy.c.patch
	cd ./ground-truth/proftpd && CC=afl-clang-lto LD=afl-clang-lto ./configure --with-modules=mod_copy
	CC=afl-clang-lto LD=afl-clang-lto make -C ./ground-truth/proftpd
	cp ./ground-truth/proftpd/proftpd ./ground-truth/proftpd.lto.afl
	rm -rf ./ground-truth/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./ground-truth/
	cd ./ground-truth/proftpd && CC=afl-clang-lto LD=afl-clang-lto ./configure --with-modules=mod_copy
	AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto make -C ./ground-truth/proftpd
	cp ./ground-truth/proftpd/proftpd ./ground-truth/proftpd.lto.cmplog
	rm -rf ./ground-truth/proftpd/
	tar xvf ./original/proftpd.tar.gz -C ./ground-truth/
	cd ./ground-truth/proftpd && CC=afl-clang-lto LD=afl-clang-lto ./configure --with-modules=mod_copy
	AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast LD=afl-clang-fast make -C ./ground-truth/proftpd
	cp ./ground-truth/proftpd/proftpd ./ground-truth/proftpd.laf-intel.afl

clean:
	rm -rf ./backdoored ./safe ./ground-truth

all: safe backdoored ground-truth

all-afl: safe-afl backdoored-afl ground-truth-afl