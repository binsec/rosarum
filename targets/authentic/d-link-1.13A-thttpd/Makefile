TARGET = thttpd
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)


all: safe backdoored ground-truth


safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO) patches/base.patch
	rm -rf safe/
	cp -r $(ORIGINAL_REPO)/ safe/
	cd safe/ && \
		patch -p1 < ../patches/base.patch && \
		./configure && \
		$(MAKE) -j$(shell nproc) thttpd


$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/base.patch patches/backdoored.patch
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO)/ backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/backdoored.patch && \
		./configure && \
		$(MAKE) -j$(shell nproc) thttpd


$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/base.patch patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO)/ ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/base.patch && \
		patch -p1 < ../patches/ground-truth.patch && \
		./configure && \
		$(MAKE) -j$(shell nproc) thttpd


clean:
	rm -rf safe/ backdoored/ ground-truth/


.PHONY: clean all safe backdoored ground-truth
