TARGET = proftpd
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)


all: safe backdoored ground-truth


safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO) patches/safe.patch
	rm -rf safe/
	cp -r $(ORIGINAL_REPO)/ safe/
	cd safe/ && \
		patch -p1 < ../patches/safe.patch && \
		./configure && \
		make -j32


$(BACKDOORED_TARGET): $(ORIGINAL_REPO)
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO)/ backdoored/
	cd backdoored/ && \
		./configure && \
		make -j32


$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO)/ ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/ground-truth.patch && \
		./configure && \
		make -j32


clean:
	rm -rf safe/ backdoored/ ground-truth/


.PHONY: clean all safe backdoored ground-truth
