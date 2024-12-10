AUTHENTIC_DIRS = $(wildcard authentic/*)
SYNTHETIC_DIRS = $(wildcard synthetic/*)

TARGETS = $(AUTHENTIC_DIRS:authentic/%=%) $(SYNTHETIC_DIRS:synthetic/%=%)

all: $(TARGETS)
	@echo $(TARGETS)


%: authentic/%
	$(MAKE) -C $<

%: synthetic/%
	$(MAKE) -C $<


clean:
	for authentic_dir in $(AUTHENTIC_DIRS); do \
		$(MAKE) -C $$authentic_dir clean; \
	done
	for synthetic_dir in $(SYNTHETIC_DIRS); do \
		$(MAKE) -C $$synthetic_dir clean; \
	done


FORCE: ;

.PHONY: all clean FORCE
