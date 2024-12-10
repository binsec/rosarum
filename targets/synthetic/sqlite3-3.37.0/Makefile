TARGET = sqlite3
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)

SHELL := /usr/bin/bash
CC = gcc

all: original safe backdoored ground-truth

safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)

$(SAFE_TARGET): $(ORIGINAL_REPO)
	rm -rf safe/
	cp -r $(ORIGINAL_REPO) safe/
	cd safe/ && \
		patch -p1 < ../patches/base.patch && \
		export CFLAGS="$(CFLAGS) -DSQLITE_MAX_LENGTH=128000000 \
               -DSQLITE_MAX_SQL_LENGTH=128000000 \
               -DSQLITE_MAX_MEMORY=25000000 \
               -DSQLITE_PRINTF_PRECISION_LIMIT=1048576 \
               -DSQLITE_DEBUG=1 \
               -DSQLITE_MAX_PAGE_COUNT=16384" && \
		./configure --disable-shared --enable-rtree && \
		make clean && \
		make -j$(shell nproc) && \
		make sqlite3.c && \
		$(CC) $(CFLAGS) -I. \
			"./test/ossfuzz.c" "./sqlite3.o" \
			-o "sqlite3_fuzz" \
			$(LDFLAGS) $(LIBS) -pthread -ldl -lm

$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/backdoored.patch
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO) backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/backdoored.patch && \
		export CFLAGS="$(CFLAGS) -DSQLITE_MAX_LENGTH=128000000 \
               -DSQLITE_MAX_SQL_LENGTH=128000000 \
               -DSQLITE_MAX_MEMORY=25000000 \
               -DSQLITE_PRINTF_PRECISION_LIMIT=1048576 \
               -DSQLITE_DEBUG=1 \
               -DSQLITE_MAX_PAGE_COUNT=16384" && \
		./configure --disable-shared --enable-rtree && \
		make clean && \
		make -j$(shell nproc) && \
		make sqlite3.c && \
		$(CC) $(CFLAGS) -I. \
			"./test/ossfuzz.c" "./sqlite3.o" \
			-o "sqlite3_fuzz" \
			$(LDFLAGS) $(LIBS) -pthread -ldl -lm

$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO) ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/ground-truth.patch && \
		export CFLAGS="$(CFLAGS) -DSQLITE_MAX_LENGTH=128000000 \
               -DSQLITE_MAX_SQL_LENGTH=128000000 \
               -DSQLITE_MAX_MEMORY=25000000 \
               -DSQLITE_PRINTF_PRECISION_LIMIT=1048576 \
               -DSQLITE_DEBUG=1 \
               -DSQLITE_MAX_PAGE_COUNT=16384" && \
		./configure --disable-shared --enable-rtree && \
		make clean && \
		make -j$(shell nproc) && \
		make sqlite3.c && \
		$(CC) $(CFLAGS) -I. \
			"./test/ossfuzz.c" "./sqlite3.o" \
			-o "sqlite3_fuzz" \
			$(LDFLAGS) $(LIBS) -pthread -ldl -lm

clean:
	rm -rf safe/ backdoored/ ground-truth/


.PHONY: clean all safe backdoored ground-truth
