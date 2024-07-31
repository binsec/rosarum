TARGET = poppler
ORIGINAL_REPO = original
FREETYPE_REPO = freetype-2.10.4
FREETYPE_LIB = $(FREETYPE_REPO)/build/lib/libfreetype.a

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)

CXX = g++

all: safe backdoored ground-truth

safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO) $(FREETYPE_LIB)
	rm -rf safe/
	cp -r $(ORIGINAL_REPO) safe/
	cd safe/ && \
		patch -p1 < ../patches/base.patch && \
		mkdir build && \
		cd build && \
			cmake .. \
				-DCMAKE_BUILD_TYPE=debug \
				-DBUILD_SHARED_LIBS=OFF \
				-DFONT_CONFIGURATION=generic \
				-DBUILD_GTK_TESTS=OFF \
				-DBUILD_QT5_TESTS=OFF \
				-DBUILD_CPP_TESTS=OFF \
				-DENABLE_LIBPNG=ON \
				-DENABLE_LIBTIFF=ON \
				-DENABLE_LIBJPEG=ON \
				-DENABLE_SPLASH=ON \
				-DENABLE_UTILS=ON \
				-DWITH_Cairo=ON \
				-DENABLE_CMS=none \
				-DENABLE_LIBCURL=OFF \
				-DENABLE_GLIB=OFF \
				-DENABLE_GOBJECT_INTROSPECTION=OFF \
				-DENABLE_QT5=OFF \
				-DENABLE_LIBCURL=OFF \
				-DWITH_NSS3=OFF \
				-DFREETYPE_INCLUDE_DIRS="$(realpath .)/$(FREETYPE_REPO)/build/include/$(FREETYPE_REPO)" \
				-DFREETYPE_LIBRARY="$(realpath .)/$(FREETYPE_REPO)/build/lib/libfreetype.a" \
				-DICONV_LIBRARIES="/usr/lib/x86_64-linux-gnu/libc.so" \
				-DCMAKE_EXE_LINKER_FLAGS_INIT="-lbrotlidec -lbz2 -lharfbuzz" && \
			make -j$(shell nproc) poppler poppler-cpp &&\
			$(CXX) -O2 -std=c++11 -Icpp -I../cpp ../pdf_fuzzer.cc -o pdf_fuzzer \
				cpp/libpoppler-cpp.a libpoppler.a ../../$(FREETYPE_REPO)/build/lib/libfreetype.a \
				-lbrotlidec -lbz2 -lharfbuzz -ljpeg -lz -lopenjp2 -lpng -ltiff -llcms2 -lm \
				-lpthread -pthread


$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/backdoored.patch
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO) backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/backdoored.patch && \
		mkdir build && \
		cd build && \
			cmake .. \
				-DCMAKE_BUILD_TYPE=debug \
				-DBUILD_SHARED_LIBS=OFF \
				-DFONT_CONFIGURATION=generic \
				-DBUILD_GTK_TESTS=OFF \
				-DBUILD_QT5_TESTS=OFF \
				-DBUILD_CPP_TESTS=OFF \
				-DENABLE_LIBPNG=ON \
				-DENABLE_LIBTIFF=ON \
				-DENABLE_LIBJPEG=ON \
				-DENABLE_SPLASH=ON \
				-DENABLE_UTILS=ON \
				-DWITH_Cairo=ON \
				-DENABLE_CMS=none \
				-DENABLE_LIBCURL=OFF \
				-DENABLE_GLIB=OFF \
				-DENABLE_GOBJECT_INTROSPECTION=OFF \
				-DENABLE_QT5=OFF \
				-DENABLE_LIBCURL=OFF \
				-DWITH_NSS3=OFF \
				-DFREETYPE_INCLUDE_DIRS="$(realpath .)/$(FREETYPE_REPO)/build/include/$(FREETYPE_REPO)" \
				-DFREETYPE_LIBRARY="$(realpath .)/$(FREETYPE_REPO)/build/lib/libfreetype.a" \
				-DICONV_LIBRARIES="/usr/lib/x86_64-linux-gnu/libc.so" \
				-DCMAKE_EXE_LINKER_FLAGS_INIT="-lbrotlidec -lbz2 -lharfbuzz" && \
			make -j$(shell nproc) poppler poppler-cpp &&\
			$(CXX) -O2 -std=c++11 -Icpp -I../cpp ../pdf_fuzzer.cc -o pdf_fuzzer \
				cpp/libpoppler-cpp.a libpoppler.a ../../$(FREETYPE_REPO)/build/lib/libfreetype.a \
				-lbrotlidec -lbz2 -lharfbuzz -ljpeg -lz -lopenjp2 -lpng -ltiff -llcms2 -lm \
				-lpthread -pthread

$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO) ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/base.patch &&\
		patch -p1 < ../patches/ground-truth.patch && \
		mkdir build &&\
		cd build && \
			cmake .. \
				-DCMAKE_BUILD_TYPE=debug \
				-DBUILD_SHARED_LIBS=OFF \
				-DFONT_CONFIGURATION=generic \
				-DBUILD_GTK_TESTS=OFF \
				-DBUILD_QT5_TESTS=OFF \
				-DBUILD_CPP_TESTS=OFF \
				-DENABLE_LIBPNG=ON \
				-DENABLE_LIBTIFF=ON \
				-DENABLE_LIBJPEG=ON \
				-DENABLE_SPLASH=ON \
				-DENABLE_UTILS=ON \
				-DWITH_Cairo=ON \
				-DENABLE_CMS=none \
				-DENABLE_LIBCURL=OFF \
				-DENABLE_GLIB=OFF \
				-DENABLE_GOBJECT_INTROSPECTION=OFF \
				-DENABLE_QT5=OFF \
				-DENABLE_LIBCURL=OFF \
				-DWITH_NSS3=OFF \
				-DFREETYPE_INCLUDE_DIRS="$(realpath .)/$(FREETYPE_REPO)/build/include/$(FREETYPE_REPO)" \
				-DFREETYPE_LIBRARY="$(realpath .)/$(FREETYPE_REPO)/build/lib/libfreetype.a" \
				-DICONV_LIBRARIES="/usr/lib/x86_64-linux-gnu/libc.so" \
				-DCMAKE_EXE_LINKER_FLAGS_INIT="-lbrotlidec -lbz2 -lharfbuzz" && \
			make -j$(shell nproc) poppler poppler-cpp &&\
			$(CXX) -O2 -std=c++11 -Icpp -I../cpp ../pdf_fuzzer.cc -o pdf_fuzzer \
				cpp/libpoppler-cpp.a libpoppler.a ../../$(FREETYPE_REPO)/build/lib/libfreetype.a \
				-lbrotlidec -lbz2 -lharfbuzz -ljpeg -lz -lopenjp2 -lpng -ltiff -llcms2 -lm \
				-lpthread -pthread

$(FREETYPE_LIB):
	cd $(FREETYPE_REPO) &&\
		rm -rf build &&\
		mkdir build &&\
		./autogen.sh &&\
		./configure --prefix="$(realpath .)/$(FREETYPE_REPO)/build" \
			--disable-shared PKG_CONFIG_PATH="$(realpath .)/$(FREETYPE_REPO)/build/lib/pkgconfig" \
			LIBS="-lbrotlidec -lbrotlicommon -lbz2 -lharfbuzz" && \
		make -j$(shell nproc) clean && \
		make -j$(shell nproc) && \
		make install

clean:
	$(MAKE) -C $(FREETYPE_REPO) clean
	rm -rf safe/ backdoored/ ground-truth/


.PHONY: clean all safe backdoored ground-truth
