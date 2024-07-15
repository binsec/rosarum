#include "nvram.h"

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char* nvram_get(char* attribute) {
  FILE* f = fopen("/tmp/www/nvram_config", "r");
  if(!f) {
    perror("fopen");
    exit(1);
  }
  char buf[128];
  size_t  size = fread(buf, sizeof(char), 128, f);
  fclose(f);
  buf[size] = '\0';
  char* line = strstr(buf, attribute);
  if(!line) {
    fprintf(stderr, "Error : no entry %s in config\n", attribute);
    return NULL;
  }
  char *val = strchr(line, ' ') + 1;
  *strchr(val, '\n') = '\0';
  char *ret = malloc(strlen(val));
  strcpy(ret, val);
  return ret;
}
