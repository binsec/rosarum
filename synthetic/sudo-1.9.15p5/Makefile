TARGET = build/bin/sudo
ORIGINAL_REPO = original
# We don't want to use sudo in certain contexts (e.g., in a Docker container), so we guard it
# behind this. It will simply do nothing if sudo is not present.
SUDO := $(shell which sudo)

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)


all: safe backdoored ground-truth


safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO)
	$(SUDO) rm -rf safe/
	cp -r $(ORIGINAL_REPO) safe/
	cd safe/ && \
		./configure --prefix=$(realpath .)/safe/build && \
		$(SUDO) make -j32 && \
		$(SUDO) make install


$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/backdoored.patch
	$(SUDO) rm -rf backdoored/
	cp -r $(ORIGINAL_REPO) backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/backdoored.patch && \
		./configure --prefix=$(realpath .)/backdoored/build && \
		$(SUDO) make -j32 && \
		$(SUDO) make install


$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	$(SUDO) rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO) ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/ground-truth.patch && \
		./configure --prefix=$(realpath .)/ground-truth/build && \
		$(SUDO) make -j32 && \
		$(SUDO) make install


clean:
	$(SUDO) rm -rf safe/ backdoored/ ground-truth/


.PHONY: clean all safe backdoored ground-truth
