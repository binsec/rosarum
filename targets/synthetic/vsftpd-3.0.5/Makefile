.DEFAULT_GOAL := all

.PHONY: safe backdoored ground-truth clean all

safe:
	mkdir -p ./$@/vsftpd-3.0.5
	cp -r original/* ./$@/vsftpd-3.0.5
	cd ./$@/vsftpd-3.0.5 && patch -p1 < ../../patches/base.patch
	$(MAKE) -C ./$@/vsftpd-3.0.5
	cp ./$@/vsftpd-3.0.5/vsftpd ./$@/
	cp ./vsftpd.conf ./$@/

backdoored:
	mkdir -p ./$@/vsftpd-3.0.5
	cp -r original/* ./$@/vsftpd-3.0.5
	cd ./$@/vsftpd-3.0.5 && patch -p1 < ../../patches/base.patch
	cd ./$@/vsftpd-3.0.5 && patch -p1 < ../../patches/backdoored.patch
	$(MAKE) -C ./$@/vsftpd-3.0.5
	cp ./$@/vsftpd-3.0.5/vsftpd ./$@/
	cp ./vsftpd.conf ./$@/

ground-truth:
	mkdir -p ./$@/vsftpd-3.0.5
	cp -r original/* ./$@/vsftpd-3.0.5
	cd ./$@/vsftpd-3.0.5 && patch -p1 < ../../patches/base.patch
	cd ./$@/vsftpd-3.0.5 && patch -p1 < ../../patches/ground-truth.patch
	$(MAKE) -C ./$@/vsftpd-3.0.5
	cp ./$@/vsftpd-3.0.5/vsftpd ./$@/
	cp ./vsftpd.conf ./$@/

clean:
	rm -rf ./backdoored ./safe ./ground-truth

all: safe backdoored ground-truth