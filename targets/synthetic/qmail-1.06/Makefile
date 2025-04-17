OUTPUT_DIR=./build

.PHONY: preamble clean

preamble:
	mkdir -p $(OUTPUT_DIR)
	tar xvf ./original/netqmail-1.06.tar.gz -C $(OUTPUT_DIR)
	cp ./original/*.sh $(OUTPUT_DIR)/netqmail-1.06

clean:
	rm -rf $(OUTPUT_DIR)