TARGET = vsftpd
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)


all: safe backdoored ground-truth

all-afl: safe-afl backdoored-afl ground-truth-afl

safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO)
	rm -rf safe/
	cp -r $(ORIGINAL_REPO)/ safe/
	cd safe/ && \
		$(MAKE) -j$(shell nproc) vsftpd

safe-afl:
	rm -rf safe/
	cp -r $(ORIGINAL_REPO)/ safe/
	patch safe/Makefile ./patches/Makefile_AFL.patch
	cd safe/ && \
		CC=gcc LD=gcc $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.ori && \
		$(MAKE) clean && \
		CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.lto.afl && \
		$(MAKE) clean && \
		AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.lto.cmplog && \
		$(MAKE) clean && \
		AFL_LLVM_LAF_ALL=1 CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.laf-intel.afl


$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/backdoored.patch
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO)/ backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/backdoored.patch && \
		$(MAKE) -j$(shell nproc) vsftpd

backdoored-afl:
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO)/ backdoored/
	patch backdoored/Makefile ./patches/Makefile_AFL.patch
	cd backdoored/ && \
		patch -p1 < ../patches/backdoored.patch && \
		CC=gcc LD=gcc $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.ori && \
		$(MAKE) clean && \
		CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.lto.afl && \
		$(MAKE) clean && \
		AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.lto.cmplog && \
		$(MAKE) clean && \
		AFL_LLVM_LAF_ALL=1 CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.laf-intel.afl


$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO)/ ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/ground-truth.patch && \
		$(MAKE) -j$(shell nproc) vsftpd

ground-truth-afl:
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO)/ ground-truth/
	patch ground-truth/Makefile ./patches/Makefile_AFL.patch
	cd ground-truth/ && \
		patch -p1 < ../patches/ground-truth.patch && \
		CC=gcc LD=gcc $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.ori && \
		$(MAKE) clean && \
		CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.lto.afl && \
		$(MAKE) clean && \
		AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.lto.cmplog && \
		$(MAKE) clean && \
		AFL_LLVM_LAF_ALL=1 CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) vsftpd && \
		cp vsftpd vsftpd.laf-intel.afl

clean:
	rm -rf safe/ backdoored/ ground-truth/

setup:
#   No-op.

teardown:
#   No-op.


.PHONY: clean all all-afl safe safe-afl backdoored backdoored-afl ground-truth ground-truth-afl setup teardown
