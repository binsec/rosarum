all: scfgmgr nvram
	cp nvram /tmp/nvram

scfgmgr: scfgmgr.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

clean:
	rm -f scfgmgr /tmp/nvram


.PHONY: all clean
