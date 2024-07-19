#include "mime_handlers.h"

#include "cgi.h"
#include "httpd.h"
#include "script.h"
#include "user.h"
#include "utils.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define no_cache                                                               \
  "Pragma: no-cache\r\nCache-Control: no-cache,no-store,must-revalidate, "     \
  "post-check=0,pre-check=0\r\nExpires: 0"

#define attach                                                                 \
  "application/x-unknown\r\nContent-Disposition: attachment; filename=%s"

char *AliasRedirectPage[20] = {"adv_wireless.html",
                               "wifi_wifi.htm",
                               "wl_mac_filtering.html",
                               "fw_mac.htm",
                               "wl_ap.html",
                               "wifi_apt.htm",
                               "fw_main.html",
                               "fw_main_0.htm",
                               "fw_virtual.html",
                               "nat_v.htm",
                               "fw_access.html",
                               "fw_pic.htm",
                               "fw_ddns.html",
                               "ddns.htm",
                               "wl_guest.html",
                               "wifi_guest.htm",
                               "wizard.html",
                               "100-index.htm",
                               "index.html",
                               NULL};

void do_file(char *param_1, struct httpd_connexion *param_2) {
  char *pcVar1;
  FILE *__stream;
  size_t __n;
  int iVar2;
  FILE *__s;
  char acStack_520[256];
  char auStack_420[1032];

  __s = param_2->out_stream;
  strncpy(acStack_520, param_1, 256);
  pcVar1 = strchr(acStack_520, 0x3f);
  if (pcVar1 != (char *)0x0) {
    *pcVar1 = '\0';
  }
  char path[1024];
  snprintf(path, 1024, "/tmp/www/%s", acStack_520);
  __stream = fopen(path, "r");
  if (__stream != (FILE *)0x0) {
    send_ok(param_2, param_1);
    while (true) {
      iVar2 = feof(__stream);
      if (iVar2 != 0)
        break;
      __n = fread(auStack_420, 1, 0x400, __stream);
      fwrite(auStack_420, 1, __n, __s);
      fflush(__s);
    }
    fclose(__stream);
    return;
  }
  send_not_found(param_2);
  return;
}

int do_auth(char *ip_str, char *authaurization) {
  int iVar1;
  iVar1 = user_islogin(ip_str, true);
  return iVar1;
}

void func1_lang(char *param_1, struct httpd_connexion *param_2,
                int content_length, char *delim)

{
  char *pcVar1;
  char acStack_410[1024];

  Slurp_buf_buf(param_2);
  pcVar1 = strchr(param_1, 0x3f);
  if (pcVar1 != (char *)0x0) {
    strncpy(acStack_410, pcVar1 + 1, 1024);
    init_cgi(acStack_410);
  }
  return;
}

void send_langjs(char *param_1, struct httpd_connexion *param_2)

{
  char *pcVar1;
  char *__dest;
  char acStack_498[4];
  char *local_494;
  char acStack_490[100];
  char acStack_42c[1028];

  pcVar1 = get_cgi("LANG");
  if (pcVar1 == (char *)0x0) {
    pcVar1 = "EN";
  }
  strncpy(acStack_498, pcVar1, 4);
  pcVar1 = get_cgi("LST");
  if (pcVar1 == (char *)0x0) {
    pcVar1 = "";
  }
  __dest = acStack_42c;
  strncpy(__dest, pcVar1, 1028);
  send_ok(param_2, param_1);
  local_494 = __dest;
  while (true) {
    pcVar1 = strsep(&local_494, ",");
    if (pcVar1 == (char *)0x0)
      break;
    sprintf(acStack_490, "lang/%s/%s_%s.js", acStack_498, __dest, acStack_498);
    __dest = local_494;
    send_script(acStack_490, param_2);
  }
  init_cgi((char *)0x0);
  return;
}

void send_html(char *url, struct httpd_connexion *hc)

{
  char **ppuVar1;
  int iVar1;
  char *__s1;
  char **ppcVar2;
  char local_30[17];

  local_30[16] = '\0';
  local_30[0] = '_';
  local_30[1] = 'X';
  local_30[2] = 'X';
  local_30[3] = 'X';
  local_30[4] = '.';
  local_30[5] = 'X';
  local_30[6] = 'X';
  local_30[7] = 'X';
  local_30[8] = '.';
  local_30[9] = 'X';
  local_30[10] = 'X';
  local_30[11] = 'X';
  local_30[12] = '.';
  local_30[13] = 'X';
  local_30[14] = 'X';
  local_30[15] = 'X';
  strncpy(local_30 + 1, hc->ip_str, 16);
  ppuVar1 = AliasRedirectPage;
  ppcVar2 = AliasRedirectPage + 1;
  __s1 = AliasRedirectPage[0];
  do {
    if (__s1 == (char *)0x0) {
    LAB_004078a4:
      do_script(url, hc);
      return;
    }
    ppuVar1 = ppuVar1 + 2;
    iVar1 = strcmp(__s1, url);
    if (iVar1 == 0) {
      url = *ppcVar2;
      if (url == (char *)0x0) {
        url = "index.htm";
      }
      goto LAB_004078a4;
    }
    __s1 = *ppuVar1;
    ppcVar2 = ppcVar2 + 2;
  } while (true);
}

void func1_apply_cgi(char *param_1, struct httpd_connexion *param_2) {
  bool bVar1;
  char *__nptr;
  int iVar2;
  int iVar3;

  init_cgi_from_post(get_post_buf(), param_2->content_lenght, param_2);
  param_2->errno = 0;
  bVar1 = checkMPtest();
  if (bVar1 == 0) {
    __nptr = get_cgi("CSRFID");
    if (__nptr == (char *)0x0) {
      __nptr = "0";
    }
    iVar2 = atoi(__nptr);
    iVar3 = make_CSRFID(param_2->ip_str);
    if (iVar2 != iVar3) {
      init_cgi((char *)0x0);
      param_2->errno = -0x3e6;
      return;
    }
  }
  return;
}


void func1_login_cgi(char *param_1, struct httpd_connexion *param_2, int cl,
                     char *d) {
  bool bVar1;
  char *pcVar2;
  char *passwd_md5;
  char *pcVar3;
  int iVar4;
  int iVar5;
  char *local_res0[4];

  local_res0[0] = param_1;
  init_cgi_from_post(get_post_buf(), param_2->content_lenght, param_2);
  bVar1 = checkMPtest();
  if (bVar1 == 0) {
    pcVar2 = get_cgi("CSRFID");
    if (pcVar2 == (char *)0x0) {
      pcVar2 = "0";
    }
    iVar4 = atoi(pcVar2);
    iVar5 = make_CSRFID(param_2->ip_str);
    if (iVar4 != iVar5) {
      init_cgi((char *)0x0);
    }
  }
  strsep(local_res0, "?");
  pcVar2 = get_cgi("usr");
  if (pcVar2 == (char *)0x0) {
    pcVar2 = user_name(0);
    passwd_md5 = get_cgi("pws");
    pcVar3 = get_cgi("GO");
    if (pcVar2 != (char *)0x0)
      goto LAB_0040d988;
  LAB_0040da84:
    iVar4 = -2;
  } else {
    passwd_md5 = get_cgi("pws");
    pcVar3 = get_cgi("GO");
  LAB_0040d988:
    if (passwd_md5 == (char *)0x0)
      goto LAB_0040da84;
    iVar4 = user_login(param_2->ip_str, pcVar2, passwd_md5);
    if (((iVar4 == 0) && (pcVar3 != (char *)0x0)) && (*pcVar3 != '\0'))
      goto LAB_0040d9c4;
  }
  pcVar3 = get_autherr_page(iVar4);
LAB_0040d9c4:
  send_redirect(param_2, pcVar3);
  init_cgi((char *)0x0);
  return;
}

void func1_logout_cgi(char *param_1, struct httpd_connexion *param_2, int cl,
                      char *d) {
  char *pcVar1;
  char *local_res0[4];

  local_res0[0] = param_1;
  init_cgi_from_post(get_post_buf(), param_2->content_lenght, param_2);
  strsep(local_res0, "?");
  user_logout(param_2->ip_str);
  pcVar1 = get_cgi("GO");
  if (pcVar1 == (char *)0x0) {
    pcVar1 = get_autherr_page(0);
  }
  send_redirect(param_2, pcVar1);
  init_cgi((char *)0x0);
  return;
}

void do_cgis(char *param_1, struct httpd_connexion *param_2) {
  char *pcVar1;
  int param2;
  FILE *param0;
  char *__dest;
  char *local_488;
  char acStack_484[100];
  char acStack_420[1024];

  param0 = param_2->out_stream;
  pcVar1 = get_cgi("LST");
  if (pcVar1 == (char *)0x0) {
    pcVar1 = "";
  }
  __dest = acStack_420;
  strncpy(__dest, pcVar1, 1024);
  send_ok(param_2, param_1);
  param2 = make_CSRFID(param_2->ip_str);
  fprintf(param0, "mmm=%d;", param2);
  fflush(param0);
  local_488 = __dest;
  while (true) {
    pcVar1 = strsep(&local_488, ",");
    if (pcVar1 == (char *)0x0)
      break;
    sprintf(acStack_484, "cgi/cgi_%s.js", __dest);
    __dest = local_488;
    send_script(acStack_484, param_2);
  }
  init_cgi((char *)0x0);
  return;
}

struct mime_handler mime_handlers[] = {{
                                           "**.asp", "text/html", no_cache,
                                           NULL, do_script,
                                           do_auth, // do_auth
                                       },
                                       {
                                           "**.txt",
                                           "text/plain",
                                           no_cache,
                                           NULL,
                                           do_script,
                                           do_auth,
                                       },
                                       {
                                           "**.htm",
                                           "text/html",
                                           no_cache,
                                           NULL,
                                           do_script,
                                           do_auth,
                                       },
                                       {
                                           "**.stm",
                                           "text/html",
                                           no_cache,
                                           NULL,
                                           do_script,
                                           do_auth,
                                       },
                                       {
                                           "**.html",
                                           "text/html",
                                           no_cache,
                                           NULL,
                                           send_html,
                                           do_auth,
                                       },
                                       {
                                           "**.xml",
                                           "text/xml",
                                           no_cache,
                                           NULL,
                                           do_script,
                                           do_auth,
                                       },
                                       {
                                           "**.ico",
                                           "image/x-icon",
                                           NULL,
                                           NULL,
                                           do_file,
                                           NULL,
                                       },
                                       {
                                           "**.css",
                                           "text/css",
                                           NULL,
                                           NULL,
                                           do_file,
                                           NULL,
                                       },
                                       {
                                           "**.gif",
                                           "image/gif",
                                           NULL,
                                           NULL,
                                           do_file,
                                           NULL,
                                       },
                                       {
                                           "**.png",
                                           "image/png",
                                           NULL,
                                           NULL,
                                           do_file,
                                           NULL,
                                       },
                                       {
                                           "**.ico",
                                           "image/x-icon",
                                           NULL,
                                           NULL,
                                           do_file,
                                           NULL,
                                       },
                                       {
                                           "lang.js",
                                           "text/javascript",
                                           no_cache,
                                           func1_lang,
                                           send_langjs,
                                           do_auth,
                                       },
                                       {
                                           "cgis.js",
                                           "text/javascript",
                                           no_cache,
                                           func1_lang,
                                           do_cgis,
                                           do_auth,
                                       },
                                       {
                                           "**.js",
                                           "text/javascript",
                                           no_cache,
                                           NULL,
                                           do_script,
                                           do_auth,
                                       },
                                       {
                                           "**.conf",
                                           "text/javascript",
                                           attach,
                                           NULL,
                                           do_script,
                                           do_auth,
                                       },
                                       {
                                           "**.log",
                                           "text/javascript",
                                           attach,
                                           NULL,
                                           do_script,
                                           do_auth,
                                       },
                                       {
                                           "login.cgi",
                                           "text/html",
                                           no_cache,
                                           func1_login_cgi,
                                           NULL,
                                           NULL,
                                       },
                                       {
                                           "logout.cgi",
                                           "text/html",
                                           no_cache,
                                           func1_logout_cgi,
                                           NULL,
                                           NULL,
                                       },
                                       {
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                           NULL,
                                       }};

struct mime_handler *get_mime_handler(char *url) {
  struct mime_handler *p = mime_handlers;
  while (p->pattern && !pattern_match_path(p->pattern, url))
    ++p;
  if (p->pattern)
    return p;
  return NULL;
}
