#include "script.h"

#include "cgi.h"
#include "httpd.h"
#include "user.h"
#include "utils.h"

#include "ctype.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int send_CSRFID(char *url, struct httpd_connexion *hc, int argc, char **argv) {
  int iVar1;
  FILE *param0;

  param0 = hc->out_stream;
  iVar1 = make_CSRFID(hc->ip_str);
  iVar1 = fprintf(param0, "%d", iVar1);
  fflush(param0);
  return iVar1;
}

int script_CGI_INCLUDE(char *url, struct httpd_connexion *hc, int param_3,
                       char **param_4) {
  FILE *__stream;
  size_t __n;
  int iVar1;
  FILE *__s;
  char auStack_410[1024];

  char path[1024];
  snprintf(path, 1024, "/tmp/www/%s", param_4[0]);

  __s = hc->out_stream;
  if ((param_3 == 1) &&
      (__stream = fopen(path, "r"), __stream != (FILE *)0x0)) {
    while (true) {
      iVar1 = feof(__stream);
      if (iVar1 != 0)
        break;
      __n = fread(auStack_410, 1, 0x400, __stream);
      fwrite(auStack_410, 1, __n, __s);
      fflush(__s);
    }
    fclose(__stream);
    return 0;
  }
  return 0;
}

struct script_handler script_handlers[] = {{"CGI_INCLUDE", script_CGI_INCLUDE},
                                           {"CGI_SECTION_ID", send_CSRFID},
                                           {NULL, NULL}};

void handle_script(char *param_1, struct httpd_connexion *hc) {
  char cVar1;
  char *pcVar2;
  char *pcVar3;
  size_t sVar4;
  int iVar5;
  char *pcVar6;
  struct script_handler *psVar7;
  char **ppcVar8;
  int argc;
  char *local_68[16];

  const unsigned short *__ctype_b = *__ctype_b_loc();

  memset(local_68, 0, 0x40);
  pcVar2 = strchr(param_1, 0x28);
  if (pcVar2 != (char *)0x0) {
    pcVar3 = find_outside_quotes(param_1, ")");
    if (pcVar3 != (char *)0x0) {
      *pcVar3 = '\0';
      *pcVar2 = '\0';
      if (pcVar2 + 1 == (char *)0x0) {
        argc = 0;
      } else {
        argc = 0;
        cVar1 = pcVar2[1];
        ppcVar8 = local_68;
        pcVar2 = pcVar2 + 1;
        while (cVar1 != '\0') {
          pcVar3 = find_outside_quotes(pcVar2, ",");
          if (pcVar3 == (char *)0x0) {
            sVar4 = strlen(pcVar2);
            pcVar3 = pcVar2 + sVar4;
            pcVar6 = (char *)0x0;
          } else {
            pcVar6 = pcVar3 + 1;
          }
          for (; ((__ctype_b[*pcVar2] & 0x20U) != 0 || (*pcVar2 == 0x22));
               pcVar2 = pcVar2 + 1) {
          }
          *pcVar3 = '\0';
          while (true) {
            pcVar3 = pcVar3 + -1;
            if (((__ctype_b[*pcVar3] & 0x20U) == 0) && (*pcVar3 != 0x22))
              break;
            *pcVar3 = '\0';
          }
          *ppcVar8 = pcVar2;
          if ((pcVar2 == (char *)0x0) ||
              ((argc = argc + 1, argc == 0x10 || (pcVar6 == (char *)0x0))))
            break;
          ppcVar8 = ppcVar8 + 1;
          pcVar2 = pcVar6;
          cVar1 = *pcVar6;
        }
      }
      pcVar2 = script_handlers[0].name;
      param_1 += strspn(param_1, " ");
      if (script_handlers[0].name != (char *)0x0) {
        sVar4 = strlen(param_1);
        psVar7 = script_handlers;
        do {
          iVar5 = strncmp(pcVar2, param_1, sVar4);
          if (iVar5 == 0) {
            (*psVar7->handler)((char *)0x0, hc, argc, local_68);
            return;
          }
          pcVar2 = psVar7[1].name;
          psVar7 = psVar7 + 1;
        } while (pcVar2 != (char *)0x0);
        fprintf(stderr, "Error : no script handler for '%s'\n", param_1);
      }
    }
  }
  return;
}

void do_script(char *param_1, struct httpd_connexion *param_2) {
  ushort uVar1;
  char *pcVar2;
  FILE *__stream;
  char *pcVar3;
  int iVar4;
  char *pbVar5;
  uint uVar6;
  int iVar7;
  int iVar8;
  char *pcVar9;
  char local_c19[1001];
  char acStack_830[2048];
  FILE *local_30;

  const unsigned short *__ctype_b = *__ctype_b_loc();

  local_30 = param_2->out_stream;
  strncpy(acStack_830, param_1, 2048);
  acStack_830[2047] = '\0';
  pcVar2 = strchr(acStack_830, L'?');
  if (pcVar2 == (char *)0x0) {
    pcVar9 = (char *)0x0;
  } else {
    pcVar9 = pcVar2 + 1;
    if (pcVar2[1] == '\0') {
      pcVar9 = pcVar2;
    }
    *pcVar2 = '\0';
  }
  char path[1024];
  snprintf(path, 1024, "/tmp/www/%s", acStack_830);
  __stream = fopen(path, "r");
  if (__stream == (FILE *)0x0) {
    send_not_found(param_2);
    return;
  }
  init_cgi(pcVar9);
  send_ok(param_2, param_1);
  pcVar2 = (char *)0x0;
  iVar7 = 0;
  pcVar9 = local_c19 + 1;
LAB_00403568:
  if (__stream->_fileno == 0)
    goto LAB_004036b0;
LAB_00403578:
  pbVar5 = (char *)__stream->_IO_write_base;
  iVar8 = iVar7;
  if (pbVar5 < __stream->_IO_write_end) {
    uVar6 = (uint)*pbVar5;
    __stream->_IO_write_base = (char *)(pbVar5 + 1);
  } else {
    uVar6 = fgetc_unlocked(__stream);
  }
  do {
    if (uVar6 == 0) {
    LAB_004036ec:
      init_cgi((char *)0x0);
      fclose(__stream);
      return;
    }
    if (uVar6 == 0xffffffff) {
      if (iVar8 != 0) {
        fputs(local_c19 + 1, local_30);
      }
      goto LAB_004036ec;
    }
    iVar7 = iVar8 + 1;
    pcVar9[iVar8] = (char)uVar6;
    pcVar9[iVar7] = '\0';
    if (iVar7 == 999) {
    LAB_00403780:
      fputs(pcVar9, local_30);
      iVar7 = 0;
      goto LAB_00403568;
    }
    if (pcVar2 == (char *)0x0) {
      if ((iVar7 < 2) ||
          (iVar4 = strncmp(local_c19 + iVar8, "<%", 2), iVar4 != 0))
        goto LAB_00403568;
      if (iVar7 != 2) {
        local_c19[iVar8] = '\0';
        pcVar2 = pcVar9;
        goto LAB_00403780;
      }
      pcVar2 = local_c19 + 3;
    }
    pcVar3 = find_outside_quotes(pcVar2, "%>");
    if (pcVar3 == (char *)0x0)
      goto LAB_00403568;
    while (pcVar2 < pcVar9 + iVar7) {
      uVar1 = __ctype_b[*pcVar2];
      while ((uVar1 & 0x20) != 0) {
        pcVar2 = pcVar2 + 1;
        uVar1 = __ctype_b[*pcVar2];
      }
      pcVar3 = find_outside_quotes(pcVar2, ";");
      if (pcVar3 == (char *)0x0)
        break;
      *pcVar3 = '\0';
      handle_script(pcVar2, param_2);
      pcVar2 = pcVar3 + 1;
    }
    pcVar2 = (char *)0x0;
    iVar7 = 0;
    if (__stream->_fileno != 0)
      goto LAB_00403578;
  LAB_004036b0:
    uVar6 = fgetc(__stream);
    iVar8 = iVar7;
  } while (true);
}

int send_script(char *param_1, struct httpd_connexion *hc)

{
  ushort uVar1;
  char *pcVar2;
  FILE *__stream;
  char *pcVar3;
  int iVar4;
  char *pbVar5;
  uint uVar6;
  int iVar7;
  int iVar8;
  char *pcVar9;
  char local_c19[1001];
  char acStack_830[2048];
  FILE *local_30;

  const unsigned short *__ctype_b = *__ctype_b_loc();

  local_30 = hc->out_stream;
  strncpy(acStack_830, param_1, 0x800);
  acStack_830[2047] = '\0';
  pcVar2 = strchr(acStack_830, 0x3f);
  if (pcVar2 == (char *)0x0) {
    pcVar9 = (char *)0x0;
  } else {
    pcVar9 = pcVar2 + 1;
    if (pcVar2[1] == '\0') {
      pcVar9 = pcVar2;
    }
    *pcVar2 = '\0';
  }
  char path[1024];
  snprintf(path, 1024, "/tmp/www/%s", acStack_830);
  __stream = fopen(path, "r");
  if (__stream == (FILE *)0x0) {
    return -1;
  }
  init_cgi(pcVar9);
  pcVar2 = (char *)0x0;
  iVar7 = 0;
  pcVar9 = local_c19 + 1;
LAB_004038d8:
  if (__stream->_fileno == 0)
    goto LAB_00403a1c;
LAB_004038e8:
  pbVar5 = (char *)__stream->_IO_write_base;
  iVar8 = iVar7;
  if (pbVar5 < __stream->_IO_write_end) {
    uVar6 = (uint)*pbVar5;
    __stream->_IO_write_base = (char *)(pbVar5 + 1);
  } else {
    uVar6 = fgetc_unlocked(__stream);
  }
  do {
    if (uVar6 == 0) {
    LAB_00403a58:
      init_cgi((char *)0x0);
      fclose(__stream);
      return 0;
    }
    if (uVar6 == 0xffffffff) {
      if (iVar8 != 0) {
        fputs(local_c19 + 1, local_30);
      }
      goto LAB_00403a58;
    }
    iVar7 = iVar8 + 1;
    pcVar9[iVar8] = (char)uVar6;
    pcVar9[iVar7] = '\0';
    if (iVar7 == 999) {
    LAB_00403af4:
      fputs(pcVar9, local_30);
      iVar7 = 0;
      goto LAB_004038d8;
    }
    if (pcVar2 == (char *)0x0) {
      if ((iVar7 < 2) ||
          (iVar4 = strncmp(local_c19 + iVar8, "<%", 2), iVar4 != 0))
        goto LAB_004038d8;
      if (iVar7 != 2) {
        local_c19[iVar8] = '\0';
        pcVar2 = pcVar9;
        goto LAB_00403af4;
      }
      pcVar2 = local_c19 + 3;
    }
    pcVar3 = find_outside_quotes(pcVar2, "%>");
    if (pcVar3 == (char *)0x0)
      goto LAB_004038d8;
    while (pcVar2 < pcVar9 + iVar7) {
      uVar1 = __ctype_b[*pcVar2];
      while ((uVar1 & 0x20) != 0) {
        pcVar2 = pcVar2 + 1;
        uVar1 = __ctype_b[*pcVar2];
      }
      pcVar3 = find_outside_quotes(pcVar2, ";");
      if (pcVar3 == (char *)0x0)
        break;
      *pcVar3 = '\0';
      handle_script(pcVar2, hc);
      pcVar2 = pcVar3 + 1;
    }
    pcVar2 = (char *)0x0;
    iVar7 = 0;
    if (__stream->_fileno != 0)
      goto LAB_004038e8;
  LAB_00403a1c:
    uVar6 = fgetc(__stream);
    iVar8 = iVar7;
  } while (true);
}
