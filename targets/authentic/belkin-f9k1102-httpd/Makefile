TARGET = build/httpd
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
	cp -r $(ORIGINAL_REPO)/ safe/
	mkdir safe/build/
	cd safe/build/ && \
		cmake $(CMAKE_ARGS) .. && \
		$(MAKE) -j$(shell nproc)


$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/backdoored.patch
	rm -rf backdoored/
	cp -r $(ORIGINAL_REPO)/ backdoored/
	mkdir backdoored/build/
	cd backdoored/ && \
		patch -p1 < ../patches/backdoored.patch
	cd backdoored/build/ && \
		cmake $(CMAKE_ARGS) .. && \
		$(MAKE) -j$(shell nproc)


$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO)/ ground-truth/
	mkdir ground-truth/build/
	cd ground-truth/ && \
		patch -p1 < ../patches/ground-truth.patch
	cd ground-truth/build/ && \
		cmake $(CMAKE_ARGS) .. && \
		$(MAKE) -j$(shell nproc)


clean:
	rm -rf safe/ backdoored/ ground-truth/

setup:
	rm -rf /tmp/www/
	cp -r www/ /tmp/

teardown:
	rm -rf /tmp/www/


.PHONY: clean all safe backdoored ground-truth setup teardown
