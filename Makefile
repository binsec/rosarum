all: sudo-1.9.15p5 proftpd-1.3.3c openwag200-scfgmgr


sudo-1.9.15p5:
	$(MAKE) -C synthetic/sudo-1.9.15p5 all

proftpd-1.3.3c:
	$(MAKE) -C authentic/proftpd-1.3.3c all

openwag200-scfgmgr:
	$(MAKE) -C authentic/openwag200-scfgmgr all


clean:
	$(MAKE) -C synthetic/sudo-1.9.15p5 clean
	$(MAKE) -C authentic/proftpd-1.3.3c clean
	$(MAKE) -C authentic/openwag200-scfgmgr clean


.PHONY: all clean sudo-1.9.15p5 proftpd-1.3.3c openwag200-scfgmgr
