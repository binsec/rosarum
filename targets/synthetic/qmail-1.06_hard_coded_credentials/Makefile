TARGET = qmail-popup
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)

USER := $(shell id | tr " " "\n" | grep uid | cut -d"(" -f2 | cut -d")" -f1)
GROUP := $(shell id | tr " " "\n" | grep gid | cut -d"(" -f2 | cut -d")" -f1)

CC = gcc

all: safe backdoored ground-truth

safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)

$(SAFE_TARGET): $(ORIGINAL_REPO)
	mkdir -p ./safe/build
	cp -r original/* ./safe/build
	cd ./safe/build && patch -p1 < ../../patches/base.patch
	cd ./safe/build/checkpassword-0.90 && \
		make clean && \
		CC=$(CC) make && \
		cp checkpassword ../..
	sed -re "s/%USER/$(USER)/g" -i ./safe/build/netqmail-1.06/conf-users
	sed -re "s/%GROUP/$(GROUP)/g" -i ./safe/build/netqmail-1.06/conf-groups
	cd ./safe/build/netqmail-1.06 && \
		make clean && \
		CC=$(CC) make && \
		cp qmail-popup ../.. && \
		cp qmail-pop3d ../..
	cp -r mailbox safe/

$(BACKDOORED_TARGET): $(ORIGINAL_REPO)
	mkdir -p ./backdoored/build
	cp -r original/* ./backdoored/build
	cd ./backdoored/build && patch -p1 < ../../patches/base.patch
	cd ./backdoored/build && patch -p1 < ../../patches/backdoored.patch
	cd ./backdoored/build/checkpassword-0.90 && \
		make clean && \
		CC=$(CC) make && \
		cp checkpassword ../..
	sed -re "s/%USER/$(USER)/g" -i ./backdoored/build/netqmail-1.06/conf-users
	sed -re "s/%GROUP/$(GROUP)/g" -i ./backdoored/build/netqmail-1.06/conf-groups
	cd ./backdoored/build/netqmail-1.06 && \
		make clean && \
		CC=$(CC) make && \
		cp qmail-popup ../.. && \
		cp qmail-pop3d ../..
	cp -r mailbox backdoored/

$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO)
	mkdir -p ./ground-truth/build
	cp -r original/* ./ground-truth/build
	cd ./ground-truth/build && patch -p1 < ../../patches/base.patch
	cd ./ground-truth/build && patch -p1 < ../../patches/ground-truth.patch
	cd ./ground-truth/build/checkpassword-0.90 && \
		make clean && \
		CC=$(CC) make && \
		cp checkpassword ../..
	sed -re "s/%USER/$(USER)/g" -i ./ground-truth/build/netqmail-1.06/conf-users
	sed -re "s/%GROUP/$(GROUP)/g" -i ./ground-truth/build/netqmail-1.06/conf-groups
	cd ./ground-truth/build/netqmail-1.06 && \
		make clean && \
		CC=$(CC) make && \
		cp qmail-popup ../.. && \
		cp qmail-pop3d ../..
	cp -r mailbox ground-truth/

clean:
	rm -rf ./backdoored ./safe ./ground-truth

setup:
#   No-op.

teardown:
#   No-op.

.PHONY: clean all safe backdoored ground-truth setup teardown