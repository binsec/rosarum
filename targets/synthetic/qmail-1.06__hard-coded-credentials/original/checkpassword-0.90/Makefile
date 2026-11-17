# Don't edit Makefile! Use conf-* for configuration.

SHELL=/bin/sh

default: it

alloc.o: \
compile alloc.c alloc.h error.h
	./compile alloc.c

alloc_re.o: \
compile alloc_re.c alloc.h byte.h
	./compile alloc_re.c

auto-str: \
load auto-str.o unix.a byte.a
	./load auto-str unix.a byte.a 

auto-str.o: \
compile auto-str.c buffer.h readwrite.h exit.h
	./compile auto-str.c

auto_home.c: \
auto-str conf-home
	./auto-str auto_home `head -1 conf-home` > auto_home.c

auto_home.o: \
compile auto_home.c
	./compile auto_home.c

buffer.o: \
compile buffer.c buffer.h
	./compile buffer.c

buffer_2.o: \
compile buffer_2.c readwrite.h buffer.h
	./compile buffer_2.c

buffer_copy.o: \
compile buffer_copy.c buffer.h
	./compile buffer_copy.c

buffer_get.o: \
compile buffer_get.c buffer.h byte.h error.h
	./compile buffer_get.c

buffer_put.o: \
compile buffer_put.c buffer.h str.h byte.h error.h
	./compile buffer_put.c

byte.a: \
makelib byte_copy.o byte_cr.o byte_diff.o str_chr.o str_len.o \
str_start.o
	./makelib byte.a byte_copy.o byte_cr.o byte_diff.o \
	str_chr.o str_len.o str_start.o

byte_copy.o: \
compile byte_copy.c byte.h
	./compile byte_copy.c

byte_cr.o: \
compile byte_cr.c byte.h
	./compile byte_cr.c

byte_diff.o: \
compile byte_diff.c byte.h
	./compile byte_diff.c

check: \
it instcheck
	./instcheck

checkpassword: \
load checkpassword.o prot.o unix.a byte.a shadow.lib crypt.lib s.lib
	./load checkpassword prot.o unix.a byte.a  `cat \
	shadow.lib` `cat crypt.lib` `cat s.lib`

checkpassword.o: \
compile checkpassword.c error.h pathexec.h prot.h hasspnam.h \
hasuserpw.h
	./compile checkpassword.c

chkshsgr: \
load chkshsgr.o
	./load chkshsgr 

chkshsgr.o: \
compile chkshsgr.c exit.h
	./compile chkshsgr.c

choose: \
warn-auto.sh choose.sh conf-home
	cat warn-auto.sh choose.sh \
	| sed s}HOME}"`head -1 conf-home`"}g \
	> choose
	chmod 755 choose

compile: \
warn-auto.sh conf-cc systype print-cc.sh trycpp.c
	sh print-cc.sh > compile
	chmod 755 compile

crypt.lib: \
trycrypt.c compile load
	( ( ./compile trycrypt.c && \
	./load trycrypt -lcrypt ) >/dev/null 2>&1 \
	&& echo -lcrypt || exit 0 ) > crypt.lib
	rm -f trycrypt.o trycrypt

env.o: \
compile env.c str.h env.h
	./compile env.c

error.o: \
compile error.c error.h
	./compile error.c

error_str.o: \
compile error_str.c error.h
	./compile error_str.c

hasshsgr.h: \
choose compile load tryshsgr.c hasshsgr.h1 hasshsgr.h2 chkshsgr \
warn-shsgr
	./chkshsgr || ( cat warn-shsgr; exit 1 )
	./choose clr tryshsgr hasshsgr.h1 hasshsgr.h2 > hasshsgr.h

hasspnam.h: \
tryspnam.c compile load
	( ( ./compile tryspnam.c && ./load tryspnam ) >/dev/null \
	2>&1 \
	&& echo \#define HASGETSPNAM 1 || exit 0 ) > hasspnam.h
	rm -f tryspnam.o tryspnam

hasuserpw.h: \
tryuserpw.c s.lib compile load
	( ( ./compile tryuserpw.c \
	  && ./load tryuserpw `cat s.lib` ) >/dev/null 2>&1 \
	&& echo \#define HASGETUSERPW 1 || exit 0 ) > hasuserpw.h
	rm -f tryuserpw.o tryuserpw

hier.o: \
compile hier.c auto_home.h
	./compile hier.c

install: \
load install.o hier.o auto_home.o unix.a byte.a
	./load install hier.o auto_home.o unix.a byte.a 

install.o: \
compile install.c buffer.h strerr.h error.h open.h readwrite.h exit.h
	./compile install.c

instcheck: \
load instcheck.o hier.o auto_home.o unix.a byte.a
	./load instcheck hier.o auto_home.o unix.a byte.a 

instcheck.o: \
compile instcheck.c strerr.h error.h readwrite.h exit.h
	./compile instcheck.c

it: \
prog install instcheck

load: \
warn-auto.sh conf-ld
	( cat warn-auto.sh; \
	echo 'main="$$1"; shift'; \
	echo exec "`head -1 conf-ld`" \
	'-o "$$main" "$$main".o $${1+"$$@"}' \
	) > load
	chmod 755 load

makelib: \
warn-auto.sh systype
	( cat warn-auto.sh; \
	echo 'main="$$1"; shift'; \
	echo 'rm -f "$$main"'; \
	echo 'ar cr "$$main" $${1+"$$@"}'; \
	case "`cat systype`" in \
	sunos-5.*) ;; \
	unix_sv*) ;; \
	irix64-*) ;; \
	irix-*) ;; \
	dgux-*) ;; \
	hp-ux-*) ;; \
	sco*) ;; \
	*) echo 'ranlib "$$main"' ;; \
	esac \
	) > makelib
	chmod 755 makelib

open_read.o: \
compile open_read.c open.h
	./compile open_read.c

open_trunc.o: \
compile open_trunc.c open.h
	./compile open_trunc.c

pathexec_env.o: \
compile pathexec_env.c stralloc.h gen_alloc.h alloc.h str.h byte.h \
env.h pathexec.h
	./compile pathexec_env.c

pathexec_run.o: \
compile pathexec_run.c error.h stralloc.h gen_alloc.h str.h env.h \
pathexec.h
	./compile pathexec_run.c

prog: \
checkpassword

prot.o: \
compile prot.c hasshsgr.h prot.h
	./compile prot.c

s.lib: \
tryslib.c compile load
	( ( ./compile tryslib.c && \
	./load tryslib -ls ) >/dev/null 2>&1 \
	&& echo -ls || exit 0 ) > s.lib
	rm -f tryslib.o tryslib

setup: \
it install
	./install

shadow.lib: \
tryshadow.c compile load
	( ( ./compile tryshadow.c && \
	./load tryshadow -lshadow ) >/dev/null 2>&1 \
	&& echo -lshadow || exit 0 ) > shadow.lib
	rm -f tryshadow.o tryshadow

str_chr.o: \
compile str_chr.c str.h
	./compile str_chr.c

str_len.o: \
compile str_len.c str.h
	./compile str_len.c

str_start.o: \
compile str_start.c str.h
	./compile str_start.c

stralloc_cat.o: \
compile stralloc_cat.c byte.h stralloc.h gen_alloc.h
	./compile stralloc_cat.c

stralloc_catb.o: \
compile stralloc_catb.c stralloc.h gen_alloc.h byte.h
	./compile stralloc_catb.c

stralloc_cats.o: \
compile stralloc_cats.c byte.h str.h stralloc.h gen_alloc.h
	./compile stralloc_cats.c

stralloc_eady.o: \
compile stralloc_eady.c alloc.h stralloc.h gen_alloc.h \
gen_allocdefs.h
	./compile stralloc_eady.c

stralloc_opyb.o: \
compile stralloc_opyb.c stralloc.h gen_alloc.h byte.h
	./compile stralloc_opyb.c

stralloc_opys.o: \
compile stralloc_opys.c byte.h str.h stralloc.h gen_alloc.h
	./compile stralloc_opys.c

stralloc_pend.o: \
compile stralloc_pend.c alloc.h stralloc.h gen_alloc.h \
gen_allocdefs.h
	./compile stralloc_pend.c

strerr_die.o: \
compile strerr_die.c buffer.h exit.h strerr.h
	./compile strerr_die.c

strerr_sys.o: \
compile strerr_sys.c error.h strerr.h
	./compile strerr_sys.c

systype: \
find-systype.sh trycpp.c x86cpuid.c
	sh find-systype.sh > systype

unix.a: \
makelib alloc.o alloc_re.o buffer.o buffer_2.o buffer_copy.o \
buffer_get.o buffer_put.o env.o error.o error_str.o open_read.o \
open_trunc.o pathexec_env.o pathexec_run.o prot.o stralloc_cat.o \
stralloc_catb.o stralloc_cats.o stralloc_eady.o stralloc_opyb.o \
stralloc_opys.o stralloc_pend.o strerr_die.o strerr_sys.o
	./makelib unix.a alloc.o alloc_re.o buffer.o buffer_2.o \
	buffer_copy.o buffer_get.o buffer_put.o env.o error.o \
	error_str.o open_read.o open_trunc.o pathexec_env.o \
	pathexec_run.o prot.o stralloc_cat.o stralloc_catb.o \
	stralloc_cats.o stralloc_eady.o stralloc_opyb.o \
	stralloc_opys.o stralloc_pend.o strerr_die.o strerr_sys.o
