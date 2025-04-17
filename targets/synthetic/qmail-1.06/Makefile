OUTPUT_DIR=./build
BACKDOORS_NAMES := $(notdir $(wildcard patches/backdoored/*))
BACKDOORED_VERSIONS := $(foreach backdoor,$(BACKDOORS_NAMES),backdoored-$(backdoor))
GROUND_TRUTH_VERSIONS := $(foreach backdoor,$(BACKDOORS_NAMES),ground-truth-$(backdoor))

.PHONY: preamble clean $(BACKDOORED_VERSIONS) $(GROUND_TRUTH_VERSIONS) safe

preamble:
	mkdir -p $(OUTPUT_DIR)
	rm -rf $(OUTPUT_DIR)/netqmail-1.06
	tar xvf ./original/netqmail-1.06.tar.gz -C $(OUTPUT_DIR)
	cp ./original/*.sh $(OUTPUT_DIR)/netqmail-1.06
	$(OUTPUT_DIR)/netqmail-1.06/ugo.sh

clean:
	rm -rf $(OUTPUT_DIR)

$(BACKDOORED_VERSIONS): preamble
	patch $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.c ./patches/backdoored/$(subst backdoored-,,$@)/qmail-popup.c.patch
	$(OUTPUT_DIR)/netqmail-1.06/make-non-instrumented.sh
	$(OUTPUT_DIR)/netqmail-1.06/make-afl.sh
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.ori $(OUTPUT_DIR)/qmail-popup-$@.ori
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.afl $(OUTPUT_DIR)/qmail-popup-$@.lto.afl
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.cmplog $(OUTPUT_DIR)/qmail-popup-$@.lto.cmplog
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.laf-intel.afl $(OUTPUT_DIR)/qmail-popup-$@.laf-intel.afl

$(GROUND_TRUTH_VERSIONS): preamble
	patch $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.c ./patches/ground-truth/$(subst ground-truth-,,$@)/qmail-popup.c.patch
	$(OUTPUT_DIR)/netqmail-1.06/make-non-instrumented.sh
	$(OUTPUT_DIR)/netqmail-1.06/make-afl.sh
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.ori $(OUTPUT_DIR)/qmail-popup-$@.ori
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.afl $(OUTPUT_DIR)/qmail-popup-$@.lto.afl
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.cmplog $(OUTPUT_DIR)/qmail-popup-$@.lto.cmplog
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.laf-intel.afl $(OUTPUT_DIR)/qmail-popup-$@.laf-intel.afl

safe: preamble
	$(OUTPUT_DIR)/netqmail-1.06/make-non-instrumented.sh
	$(OUTPUT_DIR)/netqmail-1.06/make-afl.sh
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.ori $(OUTPUT_DIR)/qmail-popup-$@.ori
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.afl $(OUTPUT_DIR)/qmail-popup-$@.lto.afl
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.cmplog $(OUTPUT_DIR)/qmail-popup-$@.lto.cmplog
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.laf-intel.afl $(OUTPUT_DIR)/qmail-popup-$@.laf-intel.afl