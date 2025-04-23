TARGET = proftpd
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)


all: safe backdoored ground-truth

all-afl: safe-afl backdoored-afl ground-truth-afl

safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO) patches/safe.patch
	rm -rf safe/
	cp -r $(ORIGINAL_REPO)/ safe/
	cd safe/ && \
		patch -p1 < ../patches/safe.patch && \
		./configure && \
		$(MAKE) -j$(shell nproc)

safe-afl:
	rm -rf safe/
	cp -r $(ORIGINAL_REPO)/ safe/
	cd safe/ && \
		patch -p1 < ../patches/safe.patch && \
		CC=gcc LD=gcc ./configure && \
		CC=gcc LD=gcc $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.ori && \
		$(MAKE) clean && \
		CC=afl-clang-lto LD=afl-clang-lto ./configure && \
		CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.lto.afl && \
		$(MAKE) clean && \
		AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto ./configure && \
		AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.lto.cmplog && \
		$(MAKE) clean && \
		AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast LD=afl-clang-fast ./configure && \
		AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast LD=afl-clang-fast $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.laf-intel.afl

$(BACKDOORED_TARGET): $(ORIGINAL_REPO)
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO)/ backdoored/
	cd backdoored/ && \
		./configure && \
		$(MAKE) -j$(shell nproc)

backdoored-afl:
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO)/ backdoored/
	cd backdoored/ && \
		CC=gcc LD=gcc ./configure && \
		CC=gcc LD=gcc $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.ori && \
		$(MAKE) clean && \
		CC=afl-clang-lto LD=afl-clang-lto ./configure && \
		CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.lto.afl && \
		$(MAKE) clean && \
		AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto ./configure && \
		AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.lto.cmplog && \
		$(MAKE) clean && \
		AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast LD=afl-clang-fast ./configure && \
		AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast LD=afl-clang-fast $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.laf-intel.afl

$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO)/ ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/ground-truth.patch && \
		./configure && \
		$(MAKE) -j$(shell nproc)

ground-truth-afl:
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO)/ ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/ground-truth.patch && \
		CC=gcc LD=gcc ./configure && \
		CC=gcc LD=gcc $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.ori && \
		$(MAKE) clean && \
		CC=afl-clang-lto LD=afl-clang-lto ./configure && \
		CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.lto.afl && \
		$(MAKE) clean && \
		AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto ./configure && \
		AFL_LLVM_CMPLOG=1 CC=afl-clang-lto LD=afl-clang-lto $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.lto.cmplog && \
		$(MAKE) clean && \
		AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast LD=afl-clang-fast ./configure && \
		AFL_LLVM_LAF_ALL=1 CC=afl-clang-fast LD=afl-clang-fast $(MAKE) -j$(shell nproc) && \
		cp proftpd proftpd.laf-intel.afl

clean:
	rm -rf safe/ backdoored/ ground-truth/

setup:
#   No-op.

teardown:
#   No-op.


.PHONY: clean all all-afl safe safe-afl backdoored backdoored-afl ground-truth ground-truth-afl setup teardown
