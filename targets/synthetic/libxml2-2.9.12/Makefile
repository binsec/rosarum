TARGET = libxml2_xml_reader_for_file_fuzzer
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)

CXX = g++
LIBS =
CXXFLAGS += -O2

all: safe backdoored ground-truth


safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO)
	rm -rf safe/
	cp -r $(ORIGINAL_REPO) safe/
	cd safe/ &&\
		patch -p1 < ../patches/base.patch &&\
		./autogen.sh \
			--with-http=no \
			--with-python=no \
			--with-lzma=yes \
			--with-threads=no \
			--disable-shared &&\
		make -j$(shell nproc) clean &&\
		make -j$(shell nproc) CFLAGS='$(CFLAGS)' all &&\
		$(CXX) $(CXXFLAGS) -std=c++11 -Iinclude/ -Ifuzz/ \
      fuzz/libxml2_xml_reader_for_file_fuzzer.cc -o libxml2_xml_reader_for_file_fuzzer \
      .libs/libxml2.a $(LDFLAGS) $(LIBS) -lz -llzma


$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/backdoored.patch
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO) backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/backdoored.patch && \
		./autogen.sh \
			--with-http=no \
			--with-python=no \
			--with-lzma=yes \
			--with-threads=no \
			--disable-shared &&\
		make -j$(shell nproc) clean &&\
		make -j$(shell nproc) CFLAGS='$(CFLAGS)' all &&\
		$(CXX) $(CXXFLAGS) -std=c++11 -Iinclude/ -Ifuzz/ \
      fuzz/libxml2_xml_reader_for_file_fuzzer.cc -o libxml2_xml_reader_for_file_fuzzer \
      .libs/libxml2.a $(LDFLAGS) $(LIBS) -lz -llzma

$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO) ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/ground-truth.patch && \
		./autogen.sh \
			--with-http=no \
			--with-python=no \
			--with-lzma=yes \
			--with-threads=no \
			--disable-shared &&\
		make -j$(shell nproc) clean &&\
		make -j$(shell nproc) CFLAGS='$(CFLAGS)' all &&\
		$(CXX) $(CXXFLAGS) -std=c++11 -Iinclude/ -Ifuzz/ \
      fuzz/libxml2_xml_reader_for_file_fuzzer.cc -o libxml2_xml_reader_for_file_fuzzer \
      .libs/libxml2.a $(LDFLAGS) $(LIBS) -lz -llzma


clean:
	rm -rf safe/ backdoored/ ground-truth/


.PHONY: clean all safe backdoored ground-truth
