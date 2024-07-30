TARGET = tiff_read_rgba_fuzzer
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)

CXX = g++
LIBS = -lwebp -lzstd -llzma -ljbig -ljpeg -ldeflate -lz -llzma
CXXFLAGS = -O2

all: safe backdoored ground-truth


safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO)
	rm -rf safe/
	cp -r $(ORIGINAL_REPO) safe/
	cd safe/ && \
		patch -p1 < ../patches/base.patch && \
		./autogen.sh && \
		./configure --disable-shared --prefix=$(realpath .)/safe/build/ && \
		make -j$(shell nproc) clean && \
		make -j$(shell nproc)  && \
		make install  && \
		$(CXX) $(CXXFLAGS) -std=c++11 -I$(realpath .)/safe/build/include \
			contrib/oss-fuzz/tiff_read_rgba_fuzzer.cc -o tiff_read_rgba_fuzzer \
			$(realpath .)/safe/build/lib/libtiffxx.a \
			$(realpath .)/safe/build/lib/libtiff.a \
			-lz -ljpeg -Wl,-Bstatic -Wl,-Bdynamic \
			$(LDFLAGS) $(LIBS)


$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/backdoored.patch
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO) backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/backdoored.patch && \
		./autogen.sh && \
		./configure --disable-shared --prefix=$(realpath .)/backdoored/build/ && \
		make -j$(shell nproc) clean && \
		make -j$(shell nproc)  && \
		make install  && \
		$(CXX) $(CXXFLAGS) -std=c++11 -I$(realpath .)/backdoored/build/include \
			contrib/oss-fuzz/tiff_read_rgba_fuzzer.cc -o tiff_read_rgba_fuzzer \
			$(realpath .)/backdoored/build/lib/libtiffxx.a \
			$(realpath .)/backdoored/build/lib/libtiff.a \
			-lz -ljpeg -Wl,-Bstatic -Wl,-Bdynamic \
			$(LDFLAGS) $(LIBS)

$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO) ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/ground-truth.patch && \
		./autogen.sh && \
		./configure --disable-shared --prefix=$(realpath .)/ground-truth/build/ && \
		make -j$(shell nproc) clean && \
		make -j$(shell nproc)  && \
		make install  && \
		$(CXX) $(CXXFLAGS) -std=c++11 -I$(realpath .)/ground-truth/build/include \
			contrib/oss-fuzz/tiff_read_rgba_fuzzer.cc -o tiff_read_rgba_fuzzer \
			$(realpath .)/ground-truth/build/lib/libtiffxx.a \
			$(realpath .)/ground-truth/build/lib/libtiff.a \
			-lz -ljpeg -Wl,-Bstatic -Wl,-Bdynamic \
			$(LDFLAGS) $(LIBS)


clean:
	rm -rf safe/ backdoored/ ground-truth/


.PHONY: clean all safe backdoored ground-truth
