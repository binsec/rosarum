.PHONY: safe backdoored ground-truth clean

safe:
	mkdir -p ./safe
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./safe/
	cd ./safe/dovecot-2.4.1-4 && ./configure
	make -C ./safe/dovecot-2.4.1-4

backdoored:
	mkdir -p ./backdoored
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./backdoored/
	patch ./backdoored/dovecot-2.4.1-4/src/imap-login/client-authenticate.c ./patches/backdoored_client-authenticate.c.patch
	cd ./backdoored/dovecot-2.4.1-4 && ./configure
	make -C ./backdoored/dovecot-2.4.1-4

ground-truth:
	mkdir -p ./ground-truth
	tar xvf ./original/dovecot-2.4.1-4.tar.gz -C ./ground-truth/
	patch ./ground-truth/dovecot-2.4.1-4/src/imap-login/client-authenticate.c ./patches/ground-truth_client-authenticate.c.patch
	cd ./ground-truth/dovecot-2.4.1-4 && ./configure
	make -C ./ground-truth/dovecot-2.4.1-4

clean:
	rm -rf ./backdoored ./safe ./ground-truth