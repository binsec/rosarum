TARGET = ossfuzz/sndfile_fuzzer
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)

CXX = g++

all: safe backdoored ground-truth


safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO)
	rm -rf safe/
	cp -r $(ORIGINAL_REPO) safe/
	cd safe/ && \
		patch -p1 < ../patches/base.patch && \
		autoreconf -vif && \
		./configure --disable-shared --enable-ossfuzzers && \
		$(MAKE) -j$(shell nproc) clean && \
		$(MAKE) -j$(shell nproc) ossfuzz/sndfile_fuzzer


$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/backdoored.patch
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO) backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/backdoored.patch && \
		autoreconf -vif && \
		./configure --disable-shared --enable-ossfuzzers && \
		$(MAKE) -j$(shell nproc) clean && \
		$(MAKE) -j$(shell nproc) ossfuzz/sndfile_fuzzer

$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO) ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/ground-truth.patch && \
		autoreconf -vif && \
		./configure --disable-shared --enable-ossfuzzers && \
		$(MAKE) -j$(shell nproc) clean && \
		$(MAKE) -j$(shell nproc) ossfuzz/sndfile_fuzzer


clean:
	rm -rf safe/ backdoored/ ground-truth/

setup:
#   No-op.

teardown:
#   No-op.


.PHONY: clean all safe backdoored ground-truth setup teardown
