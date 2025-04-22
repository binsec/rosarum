AUTHENTIC_DIRS = $(wildcard authentic/*)
AUTHENTIC_AFL_DIRS = $(shell grep -l all-afl authentic/*/Makefile | sed -re 's?/Makefile$$??g' | xargs)
SYNTHETIC_DIRS = $(wildcard synthetic/*)
SYNTHETIC_AFL_DIRS = $(shell grep -l all-afl synthetic/*/Makefile | sed -re 's?/Makefile$$??g' | xargs)

AUTHENTIC_TARGETS = $(AUTHENTIC_DIRS:authentic/%=%)
AUTHENTIC_TARGETS_AFL = $(AUTHENTIC_AFL_DIRS:authentic/%=%-afl)
SYNTHETIC_TARGETS = $(SYNTHETIC_DIRS:synthetic/%=%)
SYNTHETIC_TARGETS_AFL = $(SYNTHETIC_AFL_DIRS:synthetic/%=%-afl)
TARGETS = $(AUTHENTIC_TARGETS) $(SYNTHETIC_TARGETS)
AFL_TARGETS = $(AUTHENTIC_TARGETS_AFL) $(SYNTHETIC_TARGETS_AFL)

all: $(TARGETS)

all-afl: $(AFL_TARGETS)

authentic: $(AUTHENTIC_TARGETS)

synthetic: $(SYNTHETIC_TARGETS)

authentic-afl: $(AUTHENTIC_TARGETS_AFL)

synthetic-afl: $(SYNTHETIC_TARGETS_AFL)

%: authentic/%
	$(MAKE) -C $<

%: synthetic/%
	$(MAKE) -C $<

%-afl: authentic/%
	$(MAKE) -C $(subst -afl,,$<) all
	$(MAKE) -C $(subst -afl,,$<) all-afl

%-afl: synthetic/%
	$(MAKE) -C $(subst -afl,,$<) all
	$(MAKE) -C $(subst -afl,,$<) all-afl

clean:
	for authentic_dir in $(AUTHENTIC_DIRS); do \
		$(MAKE) -C $$authentic_dir clean; \
	done
	for synthetic_dir in $(SYNTHETIC_DIRS); do \
		$(MAKE) -C $$synthetic_dir clean; \
	done


FORCE: ;

.PHONY: all all-afl clean FORCE
