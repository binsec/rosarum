TARGET = sapi/fuzzer/php-fuzz-unserialize
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)


all: original safe backdoored ground-truth

safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO)
	rm -rf safe/
	cp -r $(ORIGINAL_REPO) safe/
	cd safe/ && \
		patch -p1 < ../patches/base.patch && \
		./buildconf --force && \
		LIB_FUZZING_ENGINE="-Wall" ./configure \
				--disable-all \
				--enable-option-checking=fatal \
				--enable-fuzzer \
				--enable-exif \
				--enable-phar \
				--without-pcre-jit \
				--disable-phpdbg \
				--disable-cgi \
				--with-pic && \
		make -j$(shell nproc) clean && \
		make -j$(shell nproc) EXTRA_CXXFLAGS=$(EXTRA_CXXFLAGS)


$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/backdoored.patch
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO) backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/backdoored.patch && \
		./buildconf --force && \
		LIB_FUZZING_ENGINE="-Wall" ./configure \
				--disable-all \
				--enable-option-checking=fatal \
				--enable-fuzzer \
				--enable-exif \
				--enable-phar \
				--without-pcre-jit \
				--disable-phpdbg \
				--disable-cgi \
				--with-pic && \
		make -j$(shell nproc) clean && \
		make -j$(shell nproc) EXTRA_CXXFLAGS=$(EXTRA_CXXFLAGS)

$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO) ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/ground-truth.patch && \
		./buildconf --force && \
		LIB_FUZZING_ENGINE="-Wall" ./configure \
				--disable-all \
				--enable-option-checking=fatal \
				--enable-fuzzer \
				--enable-exif \
				--enable-phar \
				--without-pcre-jit \
				--disable-phpdbg \
				--disable-cgi \
				--with-pic && \
		make -j$(shell nproc) clean && \
		make -j$(shell nproc) EXTRA_CXXFLAGS=$(EXTRA_CXXFLAGS)


clean:
	rm -rf safe/ backdoored/ ground-truth/


.PHONY: clean all safe backdoored ground-truth
