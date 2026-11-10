TARGET = vsftpd
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)

all: safe backdoored ground-truth

safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)

$(SAFE_TARGET): $(ORIGINAL_REPO)
	mkdir -p ./safe/vsftpd-3.0.5
	cp -r original/* ./safe/vsftpd-3.0.5
	cd ./safe/vsftpd-3.0.5 && patch -p1 < ../../patches/base.patch
	$(MAKE) -C ./safe/vsftpd-3.0.5
	cp ./safe/vsftpd-3.0.5/vsftpd ./safe/
	cp ./vsftpd.conf ./safe/

$(BACKDOORED_TARGET): $(ORIGINAL_REPO)
	mkdir -p ./backdoored/vsftpd-3.0.5
	cp -r original/* ./backdoored/vsftpd-3.0.5
	cd ./backdoored/vsftpd-3.0.5 && patch -p1 < ../../patches/base.patch
	cd ./backdoored/vsftpd-3.0.5 && patch -p1 < ../../patches/backdoored.patch
	$(MAKE) -C ./backdoored/vsftpd-3.0.5
	cp ./backdoored/vsftpd-3.0.5/vsftpd ./backdoored/
	cp ./vsftpd.conf ./backdoored/

$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO)
	mkdir -p ./ground-truth/vsftpd-3.0.5
	cp -r original/* ./ground-truth/vsftpd-3.0.5
	cd ./ground-truth/vsftpd-3.0.5 && patch -p1 < ../../patches/base.patch
	cd ./ground-truth/vsftpd-3.0.5 && patch -p1 < ../../patches/ground-truth.patch
	$(MAKE) -C ./ground-truth/vsftpd-3.0.5
	cp ./ground-truth/vsftpd-3.0.5/vsftpd ./ground-truth/
	cp ./vsftpd.conf ./ground-truth/

clean:
	rm -rf ./backdoored ./safe ./ground-truth

setup:
#   No-op.

teardown:
#   No-op.

.PHONY: clean all safe backdoored ground-truth setup teardown