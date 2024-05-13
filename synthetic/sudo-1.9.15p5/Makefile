TARGET = build/bin/sudo
ORIGINAL_REPO = original

SAFE_TARGET = safe/$(TARGET)
BACKDOORED_TARGET = backdoored/$(TARGET)
GROUND_TRUTH_TARGET = ground-truth/$(TARGET)


all: safe backdoored ground-truth


safe: $(SAFE_TARGET)

backdoored: $(BACKDOORED_TARGET)

ground-truth: $(GROUND_TRUTH_TARGET)


$(SAFE_TARGET): $(ORIGINAL_REPO)
	sudo rm -rf safe/
	cp -r $(ORIGINAL_REPO) safe/
	cd safe/ && \
		./configure --prefix=$(PWD)/safe/build && \
		sudo make -j32 && \
		sudo make install


$(BACKDOORED_TARGET): $(ORIGINAL_REPO) patches/backdoored.patch
	sudo rm -rf backdoored/
	cp -r $(ORIGINAL_REPO) backdoored/
	cd backdoored/ && \
		patch -p1 < ../patches/backdoored.patch && \
		./configure --prefix=$(PWD)/backdoored/build && \
		sudo make -j32 && \
		sudo make install


$(GROUND_TRUTH_TARGET): $(ORIGINAL_REPO) patches/ground-truth.patch
	sudo rm -rf ground-truth/
	cp -r $(ORIGINAL_REPO) ground-truth/
	cd ground-truth/ && \
		patch -p1 < ../patches/ground-truth.patch && \
		./configure --prefix=$(PWD)/ground-truth/build && \
		sudo make -j32 && \
		sudo make install


clean:
	sudo rm -rf safe/ backdoored/ ground-truth/


.PHONY: clean all safe backdoored ground-truth
