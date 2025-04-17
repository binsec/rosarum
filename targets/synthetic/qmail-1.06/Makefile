OUTPUT_DIR=./build
BACKDOORS_NAMES := $(notdir $(wildcard patches/backdoored/*))
BACKDOORED_VERSIONS := $(foreach backdoor,$(BACKDOORS_NAMES),$(backdoor)-backdoored)

.PHONY: preamble clean

preamble:
	mkdir -p $(OUTPUT_DIR)
	tar xvf ./original/netqmail-1.06.tar.gz -C $(OUTPUT_DIR)
	cp ./original/*.sh $(OUTPUT_DIR)/netqmail-1.06

clean:
	rm -rf $(OUTPUT_DIR)

$(BACKDOORED_VERSIONS): preamble
	echo $@