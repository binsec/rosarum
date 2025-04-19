.PHONY: safe backdoored ground-truth clean

safe:
	mkdir -p ./safe
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./safe/
	cd ./safe/dovecot-2.4.1-4 && ./configure
	make -C ./safe/dovecot-2.4.1-4

backdoored:

ground-truth:

clean:
	rm -rf ./backdoored ./safe ./ground-truth