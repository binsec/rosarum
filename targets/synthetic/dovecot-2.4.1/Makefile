.DEFAULT_GOAL := all

.PHONY: safe safe-afl backdoored backdoored-afl ground-truth ground-truth-afl clean all all-afl

safe:
	mkdir -p ./safe
	rm -rf ./safe/dovecot-2.4.1-4/
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./safe/
	cd ./safe/dovecot-2.4.1-4 && ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./safe)
	make -C ./safe/dovecot-2.4.1-4
	cp ./safe/dovecot-2.4.1-4/src/master/dovecot ./safe/dovecot.ori
	make -C ./safe/dovecot-2.4.1-4 install
	cp ./dovecot.conf ./safe/etc/dovecot/

safe-afl:
	mkdir -p ./safe
	rm -rf ./safe/dovecot-2.4.1-4/
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./safe/
	cd ./safe/dovecot-2.4.1-4 && CC=afl-clang-lto ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./safe)
	CC=afl-clang-lto make -C ./safe/dovecot-2.4.1-4
	cp ./safe/dovecot-2.4.1-4/src/master/dovecot ./safe/dovecot.lto.afl
	rm -rf ./safe/dovecot-2.4.1-4
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./safe/
	cd ./safe/dovecot-2.4.1-4 && CC=afl-clang-lto ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./safe)
	AFL_LLVM_CMPLOG=1 CC=afl-clang-lto make -C ./safe/dovecot-2.4.1-4
	cp ./safe/dovecot-2.4.1-4/src/master/dovecot ./safe/dovecot.lto.cmplog
	rm -rf ./safe/dovecot-2.4.1-4
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./safe/
	cd ./safe/dovecot-2.4.1-4 && CC=afl-clang-fast ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./safe)
	AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast make -C ./safe/dovecot-2.4.1-4
	cp ./safe/dovecot-2.4.1-4/src/master/dovecot ./safe/dovecot.laf-intel.afl

backdoored:
	mkdir -p ./backdoored
	rm -rf ./backdoored/dovecot-2.4.1-4/
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./backdoored/
	patch ./backdoored/dovecot-2.4.1-4/src/imap-login/client-authenticate.c ./patches/backdoored_client-authenticate.c.patch
	cd ./backdoored/dovecot-2.4.1-4 && ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./backdoored)
	make -C ./backdoored/dovecot-2.4.1-4
	cp ./backdoored/dovecot-2.4.1-4/src/master/dovecot ./backdoored/dovecot.ori
	make -C ./backdoored/dovecot-2.4.1-4 install
	cp ./dovecot.conf ./backdoored/etc/dovecot/

backdoored-afl:
	mkdir -p ./backdoored
	rm -rf ./backdoored/dovecot-2.4.1-4/
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./backdoored/
	patch ./backdoored/dovecot-2.4.1-4/src/imap-login/client-authenticate.c ./patches/backdoored_client-authenticate.c.patch
	cd ./backdoored/dovecot-2.4.1-4 && CC=afl-clang-lto ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./backdoored)
	CC=afl-clang-lto make -C ./backdoored/dovecot-2.4.1-4
	cp ./backdoored/dovecot-2.4.1-4/src/master/dovecot ./backdoored/dovecot.lto.afl
	rm -rf ./backdoored/dovecot-2.4.1-4/
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./backdoored/
	patch ./backdoored/dovecot-2.4.1-4/src/imap-login/client-authenticate.c ./patches/backdoored_client-authenticate.c.patch
	cd ./backdoored/dovecot-2.4.1-4 && CC=afl-clang-lto ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./backdoored)
	AFL_LLVM_CMPLOG=1 CC=afl-clang-lto make -C ./backdoored/dovecot-2.4.1-4
	cp ./backdoored/dovecot-2.4.1-4/src/master/dovecot ./backdoored/dovecot.lto.cmplog
	rm -rf ./backdoored/dovecot-2.4.1-4/
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./backdoored/
	patch ./backdoored/dovecot-2.4.1-4/src/imap-login/client-authenticate.c ./patches/backdoored_client-authenticate.c.patch
	cd ./backdoored/dovecot-2.4.1-4 && CC=afl-clang-fast ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./backdoored)
	AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast make -C ./backdoored/dovecot-2.4.1-4
	cp ./backdoored/dovecot-2.4.1-4/src/master/dovecot ./backdoored/dovecot.laf-intel.afl

ground-truth:
	mkdir -p ./ground-truth
	rm -rf ./ground-truth/dovecot-2.4.1-4/
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./ground-truth/
	patch ./ground-truth/dovecot-2.4.1-4/src/imap-login/client-authenticate.c ./patches/ground-truth_client-authenticate.c.patch
	cd ./ground-truth/dovecot-2.4.1-4 && ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./ground-truth)
	make -C ./ground-truth/dovecot-2.4.1-4
	cp ./ground-truth/dovecot-2.4.1-4/src/master/dovecot ./ground-truth/dovecot.ori
	make -C ./ground-truth/dovecot-2.4.1-4 install
	cp ./dovecot.conf ./ground-truth/etc/dovecot/

ground-truth-afl:
	mkdir -p ./ground-truth
	rm -rf ./ground-truth/dovecot-2.4.1-4/
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./ground-truth/
	patch ./ground-truth/dovecot-2.4.1-4/src/imap-login/client-authenticate.c ./patches/ground-truth_client-authenticate.c.patch
	cd ./ground-truth/dovecot-2.4.1-4 && CC=afl-clang-lto ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./ground-truth)
	CC=afl-clang-lto make -C ./ground-truth/dovecot-2.4.1-4
	cp ./ground-truth/dovecot-2.4.1-4/src/master/dovecot ./ground-truth/dovecot.lto.afl
	rm -rf ./ground-truth/dovecot-2.4.1-4/
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./ground-truth/
	patch ./ground-truth/dovecot-2.4.1-4/src/imap-login/client-authenticate.c ./patches/ground-truth_client-authenticate.c.patch
	cd ./ground-truth/dovecot-2.4.1-4 && CC=afl-clang-lto ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./ground-truth)
	AFL_LLVM_CMPLOG=1 CC=afl-clang-lto make -C ./ground-truth/dovecot-2.4.1-4
	cp ./ground-truth/dovecot-2.4.1-4/src/master/dovecot ./ground-truth/dovecot.lto.cmplog
	rm -rf ./ground-truth/dovecot-2.4.1-4/
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./ground-truth/
	patch ./ground-truth/dovecot-2.4.1-4/src/imap-login/client-authenticate.c ./patches/ground-truth_client-authenticate.c.patch
	cd ./ground-truth/dovecot-2.4.1-4 && CC=afl-clang-fast ./configure --without-shared-libs --without-systemd --prefix=$(shell realpath ./ground-truth)
	AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast make -C ./ground-truth/dovecot-2.4.1-4
	cp ./ground-truth/dovecot-2.4.1-4/src/master/dovecot ./ground-truth/dovecot.laf-intel.afl

clean:
	rm -rf ./backdoored ./safe ./ground-truth

all: safe backdoored ground-truth

all-afl: safe-afl backdoored-afl ground-truth-afl