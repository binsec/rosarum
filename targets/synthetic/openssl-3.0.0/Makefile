TARGET = fuzz/bignum
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)

all: safe backdoored ground-truth

safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO)
	rm -rf safe/
	cp -r $(ORIGINAL_REPO) safe/
	cd safe/ && \
		patch -p1 < ../patches/base.patch && \
		./config --debug enable-fuzz-libfuzzer enable-fuzz-afl disable-tests -DPEDANTIC \
			-DFUZZING_BUILD_MODE_UNSAFE_FOR_PRODUCTION no-shared no-module \
			enable-tls1_3 enable-rc5 enable-md2 enable-ec_nistp_64_gcc_128 enable-ssl3 \
			enable-ssl3-method enable-nextprotoneg enable-weak-ssl-ciphers \
			$(CFLAGS) -fno-sanitize=alignment && \
		$(MAKE) -j$(shell nproc) clean && \
		$(MAKE) -j$(shell nproc)


$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/backdoored.patch
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO) backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/backdoored.patch && \
		./config --debug enable-fuzz-libfuzzer enable-fuzz-afl disable-tests -DPEDANTIC \
			-DFUZZING_BUILD_MODE_UNSAFE_FOR_PRODUCTION no-shared no-module \
			enable-tls1_3 enable-rc5 enable-md2 enable-ec_nistp_64_gcc_128 enable-ssl3 \
			enable-ssl3-method enable-nextprotoneg enable-weak-ssl-ciphers \
			$(CFLAGS) -fno-sanitize=alignment && \
		$(MAKE) -j$(shell nproc) clean && \
		$(MAKE) -j$(shell nproc)

$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO) ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/ground-truth.patch && \
		./config --debug enable-fuzz-libfuzzer enable-fuzz-afl disable-tests -DPEDANTIC \
			-DFUZZING_BUILD_MODE_UNSAFE_FOR_PRODUCTION no-shared no-module \
			enable-tls1_3 enable-rc5 enable-md2 enable-ec_nistp_64_gcc_128 enable-ssl3 \
			enable-ssl3-method enable-nextprotoneg enable-weak-ssl-ciphers \
			$(CFLAGS) -fno-sanitize=alignment && \
		$(MAKE) -j$(shell nproc) clean && \
		$(MAKE) -j$(shell nproc)


clean:
	rm -rf safe/ backdoored/ ground-truth/

setup:
#   No-op.

teardown:
#   No-op.


.PHONY: clean all safe backdoored ground-truth setup teardown
