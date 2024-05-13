all: sudo-1.9.15p5 proftpd-1.3.3c


sudo-1.9.15p5:
	$(MAKE) -C synthetic/sudo-1.9.15p5

proftpd-1.3.3c:
	$(MAKE) -C authentic/proftpd-1.3.3c
