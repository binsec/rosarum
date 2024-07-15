#include "utils.h"
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

char *find_outside_quotes(char *haystack, char *needle) {
  size_t sVar1;
  int iVar2;
  int iVar3;
  char *pcVar4;

  sVar1 = strlen(haystack);
  pcVar4 = haystack + sVar1;
  iVar3 = 0;
  if (haystack < pcVar4) {
    do {
      if (iVar3 == 0) {
        sVar1 = strlen(needle);
        iVar2 = strncmp(needle, haystack, sVar1);
        if (iVar2 == 0) {
          return haystack;
        }
      }
      if (*haystack == '\"') {
        if (iVar3 == 0) {
          iVar3 = 1;
        } else {
          iVar3 = iVar3 + -1;
        }
      }
      haystack = haystack + 1;
    } while (haystack < pcVar4);
  }
  return (char *)0x0;
}

int str2arglist(char *param_1, char **param_2, char param_3, int param_4) {
  char *pcVar1;
  char **ppcVar2;
  char cVar3;
  int uVar4;

  *param_2 = param_1;
  cVar3 = *param_1;
  if ((cVar3 != '\0') && (ppcVar2 = param_2 + 1, 1 < param_4)) {
    uVar4 = 1;
    pcVar1 = param_1;
    do {
      if ((param_3 == cVar3) || (cVar3 == '\n')) {
        *pcVar1 = '\0';
        *ppcVar2 = pcVar1 + 1;
        uVar4 = uVar4 + 1;
        ppcVar2 = ppcVar2 + 1;
      }
      pcVar1 = pcVar1 + 1;
      cVar3 = *pcVar1;
    } while ((cVar3 != '\0') && ((int)uVar4 < param_4));
    if (uVar4 != 1) {
      return uVar4;
    }
    cVar3 = *param_1;
  }
  return (int)(cVar3 != '\0');
}

char **init_check_list(char *bypass_list, int *size)

{
  int uVar1;
  char **puVar2;
  int iVar2;
  int uVar3;
  char *local_90[30];

  uVar1 = str2arglist(bypass_list, local_90, ' ', 0x1e);
  *size = uVar1;
  puVar2 = (char **)malloc((uVar1 + 1) * sizeof(char *));
  if (0 < uVar1) {
    uVar3 = 0;
    iVar2 = 0;
    do {
      puVar2[uVar3] = local_90[uVar3];
      uVar3++;
    } while (uVar1 != uVar3);
    puVar2[uVar1] = NULL;
    return puVar2;
  }
  *puVar2 = NULL;
  return puVar2;
}

bool patern_match_path_no_alternatives(char *pattern, size_t size, char *path)

{
  char cVar1;
  bool bVar2;
  int sVar3;
  char *pcVar3;
  char *pcVar4;

  if (0 < size) {
    pcVar3 = path + size;
    pcVar4 = pattern;
    do {
      cVar1 = *pcVar4;
      if (cVar1 == '?') {
        if (*path == '\0') {
          return false;
        }
      } else {
        if (cVar1 == '*') {
          pcVar3 = pcVar4 + 1;
          if (pcVar4[1] == '*') {
            pcVar3 = pcVar4 + 2;
            sVar3 = strlen(path);
          } else {
            sVar3 = strcspn(path, "/");
          }
          if (sVar3 < 0) {
            return false;
          }
          pcVar4 = path + sVar3;
          do {
            bVar2 = patern_match_path_no_alternatives(
                pcVar3, size - (pcVar3 - pattern), pcVar4);
            sVar3 = sVar3 - 1;
            pcVar4 = pcVar4 + -1;
            if (bVar2) {
              return true;
            }
          } while (sVar3 != -1);
          return false;
        }
        if (*path != cVar1) {
          return false;
        }
      }
      path = path + 1;
      pcVar4 = pcVar4 + 1;
    } while (pcVar3 != path);
  }
  return *path == '\0';
}

bool pattern_match_path(char *pattern, char *path)

{
  bool bVar1;
  char *pcVar2;
  size_t size;

  do {
    pcVar2 = strchr(pattern, L'|');
    if (pcVar2 == (char *)0x0) {
      size = strlen(pattern);
      bVar1 = patern_match_path_no_alternatives(pattern, size, path);
      return bVar1;
    }
    bVar1 = patern_match_path_no_alternatives(pattern, pcVar2 - pattern, path);
    pattern = pcVar2 + 1;
  } while (!bVar1);
  return true;
}
