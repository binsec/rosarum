#define _GNU_SOURCE
#include "cgi.h"
#include "httpd.h"

#include <ctype.h>
#include <search.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

size_t cgi_args_count;
struct hsearch_data table;

void set_cgi(char *key, char *val) {
  ENTRY e;
  e.key = key;
  e.data = val;
  ENTRY *r;
  hsearch_r(e, FIND, &r, &table);
  if(!r){
    cgi_args_count++;
  }
  hsearch_r(e, ENTER, &r, &table);
}

char *get_cgi(char *attr) {
  if (!table.table)
    return NULL;
  ENTRY s;
  ENTRY *r;
  s.key = attr;
  s.data = NULL;
  hsearch_r(s, FIND, &r, &table);
  if (r) {
    return r->data;
  }
  return NULL;
}

void init_cgi(char *urlargs) {
  //fprintf(stderr, "init_cgi('%s')\n", urlargs);
  cgi_args_count = 0;
  if (urlargs == (char *)0x0) {
    hdestroy_r(&table);
  } else {
    size_t n = 0;
    char *a = urlargs;
    char *b;
    do {
      b = strsep(&a, "&;");
      n++;
    } while (b);
    --n;
    hcreate_r(n, &table);
    char *r = urlargs;
    char *w = urlargs;
    for (int i = 0; i < n; ++i) {
      char *val = w;
      while (*r) {
        if (*r == '%') {
          if (isxdigit(r[1]) && isxdigit(r[2])) {
            int d;
            sscanf(&r[1], "%2x", &d);
            *w = (char)d;
            r += 2;
          } else {
            fprintf(stderr,
                    "Error while decoding url %c%c isn't a valid "
                    "hexadecimal number",
                    r[1], r[2]);
            exit(1);
          }
        } else if (*r == '+') {
          *w = ' ';
        } else {
          *w = *r;
        }
        ++r;
        ++w;
      }
      *w = '\0';
      r++;
      w = r;
      
      //fprintf(stderr, "cgi: %s\n", val);

      char *key = strsep(&val, "=");
      set_cgi(key, val);
      //fprintf(stderr, "cgi: %s -> %s\n", key, val);
    }
  }
}

void init_cgi_from_post(char *post_buf, int content_length,
                        struct httpd_connexion *hc) {
  size_t sVar1;
  char *pcVar2;
  FILE *__stream;
  int iVar3;
  int (*pcVar4)(FILE *);

  __stream = hc->out_stream;
  if (content_length < 1) {
    init_cgi(post_buf);
    return;
  }
  size_t s = (content_length + 1);
  if (0x02706 + 10 < s) {
    s = 0x02706 + 10;
  }
  pcVar2 = fgets(post_buf, s, __stream);
  //fprintf(stderr, "post_buf = '%s'\n", pcVar2);
  if (pcVar2 != (char *)0x0) {
    sVar1 = strlen(post_buf);
    iVar3 = content_length - sVar1;
    init_cgi(post_buf);
    if (0 < iVar3) {
      do {
        while (true) {
          iVar3 = iVar3 + -1;
          if (iVar3 == -1) {
            return;
          }
          pcVar4 = fgetc;
          if (__stream->_fileno != 0)
            break;
        LAB_0040b228:
          (*pcVar4)(__stream);
        }
        pcVar4 = fgetc_unlocked;
        if (__stream->_IO_write_end <= __stream->_IO_write_base)
          goto LAB_0040b228;
        __stream->_IO_write_base = __stream->_IO_write_base + 1;
      } while (true);
    }
  }
  return;
}
