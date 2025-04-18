.PHONY: safe backdoored ground-truth clean

safe:
	mkdir -p ./safe
	tar xvf ./original/proftpd.tar.gz -C ./safe/
	patch ./safe/proftpd/contrib/mod_copy.c ./patches/safe-mod_copy.c.patch
	patch ./safe/proftpd/tests/t/lib/ProFTPD/Tests/Modules/mod_copy.pm ./patches/safe-mod_copy.pm.patch
	make -C ./safe/proftpd

backdoored:
	mkdir -p ./backdoored
	tar xvf ./original/proftpd.tar.gz -C ./backdoored/
	make -C ./backdoored/proftpd

ground-truth:
	mkdir -p ./ground-truth
	tar xvf ./original/proftpd.tar.gz -C ./ground-truth/
	patch ./ground-truth/proftpd/contrib/mod_copy.c ./patches/ground_truth-mod_copy.c.patch
	make -C ./ground-truth/proftpd

clean:
	rm -rf ./backdoored ./safe