OUTPUT_DIR=./build
BACKDOORS_NAMES := $(notdir $(wildcard patches/backdoored/*))
BACKDOORED_VERSIONS := $(foreach backdoor,$(BACKDOORS_NAMES),backdoored-$(backdoor))
GROUND_TRUTH_VERSIONS := $(foreach backdoor,$(BACKDOORS_NAMES),ground-truth-$(backdoor))

.PHONY: preamble clean $(BACKDOORED_VERSIONS) $(GROUND_TRUTH_VERSIONS) safe

preamble:
	mkdir -p $(OUTPUT_DIR)
	rm -rf $(OUTPUT_DIR)/netqmail-1.06 $(OUTPUT_DIR)/checkpassword-0.90
	tar xvf ./original/netqmail-1.06.tar.gz -C $(OUTPUT_DIR)
	cp ./original/*.sh $(OUTPUT_DIR)/netqmail-1.06
	$(OUTPUT_DIR)/netqmail-1.06/ugo.sh
	tar xvf ./original/checkpassword-0.90.tar.gz -C $(OUTPUT_DIR)
	cp ./original/make-non-instrumented-checkpassword.sh $(OUTPUT_DIR)/checkpassword-0.90
	patch $(OUTPUT_DIR)/checkpassword-0.90/Makefile ./original/checkpassword-Makefile.patch
	patch $(OUTPUT_DIR)/checkpassword-0.90/error.h ./original/checkpassword-error-h.patch
	$(OUTPUT_DIR)/checkpassword-0.90/make-non-instrumented-checkpassword.sh
	cp $(OUTPUT_DIR)/checkpassword-0.90/checkpassword $(OUTPUT_DIR)/
	tar xvf ./Mailbox.tar.gz -C $(OUTPUT_DIR)

clean:
	rm -rf $(OUTPUT_DIR)

$(BACKDOORED_VERSIONS): preamble
	patch $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.c ./patches/backdoored/$(subst backdoored-,,$@)/qmail-popup.c.patch
	$(OUTPUT_DIR)/netqmail-1.06/make-non-instrumented.sh
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-pop3d $(OUTPUT_DIR)/qmail-pop3d
	$(OUTPUT_DIR)/netqmail-1.06/make-afl.sh
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.ori $(OUTPUT_DIR)/qmail-popup-$@.ori
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.afl $(OUTPUT_DIR)/qmail-popup-$@.lto.afl
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.cmplog $(OUTPUT_DIR)/qmail-popup-$@.lto.cmplog
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.laf-intel.afl $(OUTPUT_DIR)/qmail-popup-$@.laf-intel.afl

$(GROUND_TRUTH_VERSIONS): preamble
	patch $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.c ./patches/ground-truth/$(subst ground-truth-,,$@)/qmail-popup.c.patch
	$(OUTPUT_DIR)/netqmail-1.06/make-non-instrumented.sh
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-pop3d $(OUTPUT_DIR)/qmail-pop3d
	$(OUTPUT_DIR)/netqmail-1.06/make-afl.sh
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.ori $(OUTPUT_DIR)/qmail-popup-$@.ori
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.afl $(OUTPUT_DIR)/qmail-popup-$@.lto.afl
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.cmplog $(OUTPUT_DIR)/qmail-popup-$@.lto.cmplog
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.laf-intel.afl $(OUTPUT_DIR)/qmail-popup-$@.laf-intel.afl

safe: preamble
	$(OUTPUT_DIR)/netqmail-1.06/make-non-instrumented.sh
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-pop3d $(OUTPUT_DIR)/qmail-pop3d
	$(OUTPUT_DIR)/netqmail-1.06/make-afl.sh
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.ori $(OUTPUT_DIR)/qmail-popup-$@.ori
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.afl $(OUTPUT_DIR)/qmail-popup-$@.lto.afl
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.lto.cmplog $(OUTPUT_DIR)/qmail-popup-$@.lto.cmplog
	cp $(OUTPUT_DIR)/netqmail-1.06/qmail-popup.laf-intel.afl $(OUTPUT_DIR)/qmail-popup-$@.laf-intel.afl