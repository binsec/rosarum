TARGET = libpng_read_fuzzer
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)

CXX ?= g++


all: safe backdoored ground-truth


safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO)
	rm -rf safe/
	cp -r $(ORIGINAL_REPO) safe/
	cd safe/ && \
		patch -p1 < ../patches/base.patch && \
		autoreconf -f -i && \
		./configure --prefix=$(realpath .)/safe/build/ && \
		$(MAKE) -j$(shell nproc) && \
		$(MAKE) install && \
		$(CXX) $(CXXFLAGS) \
			-std=c++11 \
			-I$(realpath .)/safe/build/include \
			contrib/oss-fuzz/libpng_read_fuzzer.cc \
			-o libpng_read_fuzzer \
			$(LDFLAGS) \
			$(realpath .)/safe/build/lib/libpng16.a \
			$(LIBS) \
			-lz

$(BACKDOORED_TARGET): $(ORIGINAL_REPO)
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO) backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/backdoored.patch && \
		autoreconf -f -i && \
		./configure --prefix=$(realpath .)/backdoored/build/ && \
		$(MAKE) -j$(shell nproc) && \
		$(MAKE) install && \
		$(CXX) $(CXXFLAGS) \
			-std=c++11 \
			-I$(realpath .)/backdoored/build/include \
			contrib/oss-fuzz/libpng_read_fuzzer.cc \
			-o libpng_read_fuzzer \
			$(LDFLAGS) \
			$(realpath .)/backdoored/build/lib/libpng16.a \
			$(LIBS) \
			-lz

$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO)
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO) ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/ground-truth.patch && \
		autoreconf -f -i && \
		./configure --prefix=$(realpath .)/ground-truth/build/ && \
		$(MAKE) -j$(shell nproc) && \
		$(MAKE) install && \
		$(CXX) $(CXXFLAGS) \
			-std=c++11 \
			-I$(realpath .)/ground-truth/build/include \
			contrib/oss-fuzz/libpng_read_fuzzer.cc \
			-o libpng_read_fuzzer \
			$(LDFLAGS) \
			$(realpath .)/ground-truth/build/lib/libpng16.a \
			$(LIBS) \
			-lz


clean:
	rm -rf safe/ backdoored/ ground-truth/

setup:
#   No-op.

teardown:
#   No-op.


.PHONY: clean all safe backdoored ground-truth setup teardown
