.PHONY: safe backdoored groud-truth clean

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

groud-truth:

clean:
