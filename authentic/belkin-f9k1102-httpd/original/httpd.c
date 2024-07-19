#include "httpd.h"
#include "mime_handlers.h"
#include "nvram.h"
#include "user.h"
#include "utils.h"

#include <arpa/inet.h>
#include <ctype.h>
#include <fcntl.h>
#include <netinet/in.h>
#include <signal.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include <sys/select.h>
#include <sys/socket.h>
#include <unistd.h>

int exit_ctrl;
char *g_bypass_list;
char **argp_bypass_list;
int argc_bypass_list;

char post_buf[0x2710];

char *get_post_buf(void) { return post_buf; }

void signal_handler(int sig) {
  if (sig == SIGUSR2) {
    init_user_config(0);
    return;
  }
  if (sig == SIGUSR1) {
    // user_list(print_debug, 0, 0);
    return;
  }
  exit_ctrl = 1;
  exit(0);
}

void init_bypass_list(char *bypass_list)

{
  size_t param2;
  FILE *param0;

  if (g_bypass_list != (char *)0x0) {
    free(g_bypass_list);
    g_bypass_list = (char *)0x0;
  }
  if (argp_bypass_list != (char **)0x0) {
    free(argp_bypass_list);
    argp_bypass_list = (char **)0x0;
  }
  argc_bypass_list = 0;
  if ((bypass_list != (char *)0x0) && (*bypass_list != '\0')) {
    param2 = strlen(bypass_list);
    g_bypass_list = (char *)malloc(param2 + 1);
    if (g_bypass_list != (char *)0x0) {
      strcpy(g_bypass_list, bypass_list);
      argp_bypass_list = init_check_list(g_bypass_list, &argc_bypass_list);
      return;
    }
    param0 = fopen("/dev/console", "w");
    if (param0 != (FILE *)0x0) {
      fprintf(param0, "allocate for bypass file list failed %lu bytes\n",
              param2);
      fclose(param0);
      return;
    }
  }
  return;
}

bool bypass_check(char *param_1)

{
  bool bVar1;
  char *pattern;
  char **ppcVar2;

  if (argc_bypass_list != 0) {
    pattern = *argp_bypass_list;
    ppcVar2 = argp_bypass_list;
    while (true) {
      if (pattern == (char *)0x0) {
        return false;
      }
      bVar1 = pattern_match_path(pattern, param_1);
      ppcVar2 = ppcVar2 + 1;
      if (bVar1)
        break;
      pattern = *ppcVar2;
    }
  }
  return true;
}

void Slurp_buf_buf(struct httpd_connexion *hc)

{
  uint uVar1;
  uint uVar2;
  int fd;
  FILE *pFVar3;
  char *pbVar4;
  char acStack_410[1024];

  fd = fileno(hc->out_stream);
  uVar1 = fcntl(fd, F_GETFL);
  if (uVar1 != -1) {
    fd = fileno(hc->out_stream);
    fd = fcntl(fd, F_SETFL, uVar1 | O_NONBLOCK);
    if (fd != -1) {
      do {
        pFVar3 = hc->out_stream;
        if (pFVar3->_fileno == 0) {
        LAB_00404c34:
          uVar2 = fgetc(pFVar3);
        } else {
          pbVar4 = pFVar3->_IO_write_base;
          if (pFVar3->_IO_write_end <= pbVar4) {
            uVar2 = fgetc_unlocked(pFVar3);
          } else {
            uVar2 = *pbVar4;
            pFVar3->_IO_write_base = (char *)(pbVar4 + 1);
          }
        }
        if (uVar2 == -1) {
          fd = fileno(hc->out_stream);
          fcntl(fd, F_SETFL, uVar1);
          return;
        }
        fgets(acStack_410, 0x400, hc->out_stream);
      } while (true);
    }
  }
  return;
}

void send_header(struct httpd_connexion *hc, int code, char *status,
                 char *headers, char *content_type)

{
  struct tm *__tp;
  time_t local_80;
  char acStack_7c[100];

  Slurp_buf_buf(hc);
  fprintf(hc->out_stream, "%s %d %s\r\n", "HTTP/1.0", code, status);
  fprintf(hc->out_stream, "Server: %s\r\n", "httpd");
  local_80 = time((time_t *)0x0);
  __tp = gmtime(&local_80);
  strftime(acStack_7c, 100, "%a, %d %b %Y %H:%M:%S GMT", __tp);
  fprintf(hc->out_stream, "Date: %s\r\n", acStack_7c);
  if (headers == (char *)0x0) {
    fprintf(hc->out_stream, "%s\r\n", "Cache-Control: max-age=120, public");
  } else {
    fprintf(hc->out_stream, "%s\r\n", headers);
  }
  if (content_type != (char *)0x0) {
    fprintf(hc->out_stream, "Content-Type: %s\r\n", content_type);
  }
  if (hc->cookie != (char *)0x0) {
    fprintf(hc->out_stream, "Cookie: %s\r\n", hc->cookie);
  }
  if (hc->language == (char *)0x0) {
    fprintf(hc->out_stream, "Content-Language: %s\r\n", (char *)0x0);
  }
  fwrite("Connection: close\r\n", 1, 0x13, hc->out_stream);
  fwrite("\r\n", 1, 2, hc->out_stream);
  return;
}

void send_error(struct httpd_connexion *hc, int code, char *status,
                char *headers, char *msg) {
  send_header(hc, code, status, headers, "text/html");
  fprintf(hc->out_stream,
          "<HTML><HEAD><TITLE>%d %s</TITLE></HEAD>\n<BODY "
          "BGCOLOR=\"#cc9999\"><H4>%d %s</H4>\n",
          code, status, code, status);
  fprintf(hc->out_stream, "%s\n", msg);
  fwrite("</BODY></HTML>\n", 1, 0xf, hc->out_stream);
  fflush(hc->out_stream);
  return;
}

void conv_acceptLanguage(struct httpd_connexion *hc) {
  ushort uVar1;
  char *p_field_buf;
  char iVar3;
  char *p_language;
  int iVar2;

  const unsigned short *__ctype_b = *__ctype_b_loc();

  p_language = hc->language;
  hc->language_formated[0] = '\0';
  p_field_buf = hc->language_formated;
  if (p_language != (char *)0x0) {
    iVar2 = (int)*p_language;
    if (iVar2 != 0) {
      uVar1 = __ctype_b[iVar2];
      while ((uVar1 & 4) == 0) {
        p_language = p_language + 1;
        iVar2 = (int)*p_language;
        if (iVar2 == 0)
          goto null_terminate_buf_and_exit;
        uVar1 = __ctype_b[iVar2];
      }
    joined_r0x00403ec0:
      do {
        if (iVar2 == L'\0') {
          *p_field_buf = '\0';
          return;
        }
        if (iVar2 == L';') {
          p_language = p_language + 1;
          iVar2 = (int)*p_language;
          if (iVar2 == L'\0')
            goto assign_char_to_buf_and_next;
          do {
            if (iVar2 == L',')
              goto add_space_and_next;
            p_language = p_language + 1;
            iVar2 = (int)*p_language;
          } while (iVar2 != L'\0');
          *p_field_buf = *p_language;
        } else {
          if (iVar2 == L',') {
          add_space_and_next:
            *p_field_buf = ' ';
            p_language = p_language + 1;
            iVar2 = (int)*p_language;
            p_field_buf = p_field_buf + 1;
            goto joined_r0x00403ec0;
          }
        assign_char_to_buf_and_next:
          *p_field_buf = (char)iVar2;
        }
        p_language = p_language + 1;
        iVar2 = (int)*p_language;
        p_field_buf = p_field_buf + 1;
      } while (true);
    }
  null_terminate_buf_and_exit:
    *p_field_buf = '\0';
  }
  return;
}

void send_not_found(struct httpd_connexion *param_1) {
  send_error(param_1, 404, "Not Found", (char *)0x0, "File not found.");
  return;
}

bool checkMPtest(void) {
  char *__s1;
  int iVar1;
  bool bVar2;

  __s1 = (char *)nvram_get("MPTest");
  bVar2 = false;
  if (__s1 != (char *)0x0) {
    iVar1 = strcmp(__s1, "9");
    bVar2 = iVar1 == 0;
  }
  return bVar2;
}

void send_redirect(struct httpd_connexion *param_1, char *param_2) {
  char acStack_810[2048];
  snprintf(acStack_810, 0x800, "Location: %s\r\n", param_2);
  send_header(param_1, 302, "Found", acStack_810, (char *)0x0);
  return;
}

void send_ok(struct httpd_connexion *hc, char *url)

{
  char *pcVar1;
  struct mime_handler *pmVar2;
  char url_buf[256];
  char headers_buf[1024];

  pmVar2 = hc->mime_handler;
  memset(headers_buf, 0, 0x400);
  memset(url_buf, 0, 0x100);
  strncpy(url_buf, url, 256);
  pcVar1 = strchr(url_buf, L'?');
  if (pcVar1 != (char *)0x0) {
    *pcVar1 = '\0';
  }
  pcVar1 = pmVar2->headers_format;
  if (pcVar1 != (char *)0x0) {
    sprintf(headers_buf, pcVar1, url_buf);
    pcVar1 = headers_buf;
  }
  send_header(hc, 200, "Ok", pcVar1, pmVar2->content_type);
  return;
}

char *get_autherr_page(int param_1) {
  if (param_1 == -2) {
    return "landloginerr.htm";
  }
  if (param_1 != -1) {
    if (param_1 != -3) {
      return "index.html";
    }
    return "landloginerr.htm";
  }
  return "landlogin.htm";
}

int main(int argc, char **argv) {
  fd_set fdset;
  struct httpd_connexion hc;
  char buf[10000];

  hc.socklen = 0x10;
  hc.port = PORT;
  // signal(SIGPIPE,1);
  memset(&hc.sa, 0, sizeof(hc.sa));
  hc.sa.sin_family = AF_INET;
  hc.sa.sin_addr.s_addr = htonl(INADDR_ANY);
  hc.sa.sin_port = htons(hc.port);

  hc.fd_listen = socket(AF_INET, SOCK_STREAM, 0);
  if (hc.fd_listen < 1) {
    perror("socket");
    return 1;
  }

  if (bind(hc.fd_listen, (struct sockaddr *)&hc.sa, sizeof(hc.sa)) < 0) {
    perror("bind");
    return 1;
  }

  if (listen(hc.fd_listen, 0x400) < 0) {
    perror("listen");
    return 1;
  }

  signal(SIGINT, signal_handler);
  signal(SIGHUP, signal_handler);
  signal(SIGTERM, signal_handler);
  signal(SIGUSR2, signal_handler);
  signal(SIGUSR1, signal_handler);

  init_user_config(1);
  init_bypass_list(HTTP_NEEDNT_AUTH);

accept:
  hc.fd_accept = accept(hc.fd_listen, (struct sockaddr *)&hc.sa, &hc.socklen);
  if (hc.fd_accept < 0) {
    perror("accept");
    return 1;
  }
  hc.out_stream = fdopen(hc.fd_accept, "r+");
  if (hc.out_stream == NULL) {
    perror("fdopen");
    return 1;
  }

  char ip_str[16];
  sprintf(ip_str, "%d.%d.%d.%d", hc.sa.sin_addr.s_addr & 0xff,
          hc.sa.sin_addr.s_addr >> 8 & 0xff,
          hc.sa.sin_addr.s_addr >> 0x10 & 0xff, hc.sa.sin_addr.s_addr >> 0x18);

  // if(strstr(ip_str, "192.168.169.")) {
  //   goto close_connexion;
  // }

  strncpy(hc.ip_str, ip_str, 16);

  hc.cookie = NULL;
  hc.content_lenght = 0;
  hc.encodedurl = NULL;
  hc.host = NULL;
  hc.referer = NULL;
  hc.language = NULL;
  hc.language_formated[0] = '\0';
  /*
    int fl = fcntl(hc.fd_accept, F_GETFL);
    if(fl == -1) {
      goto close_connexion;
    }

    int s = fcntl(hc.fd_accept, F_SETFL, fl | 0x80);
    if(s == -1) {
      goto close_connexion;
    }

    FD_ZERO(&fdset);
  */
  if (fgets(buf, sizeof(buf), hc.out_stream) == NULL) {
    goto close_connexion;
  }

  if (memcmp(buf, "GET", 3) && memcmp(buf, "POST", 4)) {
  not_implemented:
    send_error(&hc, 501, "Not Implemented", NULL,
               "That method is not implemented.");
    goto close_connexion;
  }
  char *p = buf;
  char *method = strsep(&p, " ");
  while (p && *p == ' ') {
    p++;
  }
  char *uri = strsep(&p, " ");
  while (p && *p == ' ') {
    p++;
  }
  char *protocol = p;

  if (uri == NULL || protocol == NULL) {
  bad_request:
    send_error(&hc, 400, "Bad Request", NULL, "Illegal filename.");
    goto close_connexion;
  }

  if (strcasecmp(method, "post") && strcasecmp(method, "get")) {
    goto not_implemented;
  }

  if (uri[0] != '/') {
    goto bad_request;
  }

  uri++;

  size_t len_uri = strlen(uri);

  if (uri[0] == '/' || !strcmp(uri, "..") || !strncmp(uri, "../", 3) ||
      strstr(uri, "/../") || !strcmp(&uri[len_uri - 3], "/..")) {
    goto bad_request;
  }

  char buf_uri[128];
  if (uri[0] == '\0' || (len_uri != 0 && uri[len_uri - 1] == '/')) {
    strncpy(buf_uri, uri, 128);
    strcat(buf_uri, "dashboard.htm");
    uri = buf_uri;
  }

  char resource[128];
  strncpy(resource, uri, 128);
  char *delim = strchr(resource, '?');
  if (delim)
    *delim = '\0';

  hc.encodedurl = uri;

  while (*p)
    ++p;

  char *authorization = NULL;
  char *boundary = NULL;

  while (true) {
    fgets(p, 10000 - (int)(p - buf), hc.out_stream);
    size_t read_size = strlen(p);
    if (strncmp(p, "Authorization:", 14) == 0) {
      size_t nb_spaces = strspn(&p[14], " \t");
      authorization = &p[14 + nb_spaces];
      authorization[strcspn(authorization, "\t\r\n")] = '\0';
    } else if (strncmp(p, "Content-Length:", 15) == 0) {
      size_t nb_spaces = strspn(&p[15], " \t");
      hc.content_lenght = strtoul(&p[15 + nb_spaces], NULL, 0);
      p[15 + nb_spaces + strcspn(&p[15 + nb_spaces], "\t\r\n")] = '\0';
    } else if (strncmp(p, "Cookie:", 7) == 0) {
      size_t nb_spaces = strspn(&p[7], " \t");
      hc.cookie = &p[7 + nb_spaces];
      hc.cookie[strcspn(hc.cookie, "\t\r\n")] = '\0';
    } else if (strncmp(p, "Host:", 5) == 0) {
      size_t nb_spaces = strspn(&p[5], " \t");
      hc.host = &p[5 + nb_spaces];
      hc.host[strcspn(hc.host, "\t\r\n")] = '\0';
    } else if (strncmp(p, "Referer:", 8) == 0) {
      size_t nb_spaces = strspn(&p[8], " \t");
      hc.referer = &p[8 + nb_spaces];
      hc.referer[strcspn(hc.referer, "\t\r\n")] = '\0';
    } else if (strncmp(p, "Accept-Language:", 16) == 0) {
      size_t nb_spaces = strspn(&p[16], " \t");
      hc.language = &p[16 + nb_spaces];
      hc.language[strcspn(hc.language, "\t\r\n")] = '\0';
      conv_acceptLanguage(&hc);
    } else if (boundary = strstr(p, "boundary="), boundary) {
      boundary += 9;
      boundary[strcspn(boundary, "\t\r\n")] = '\0';
    } else if (strcmp(p, "\r\n") == 0) {
      break;
    }
    p += read_size;
  }

  /*
  printf("method = %s\n", method);
  printf("uri = %s\n", hc.encodedurl);
  printf("protocol = %s\n", protocol);
  printf("Authorization = %s\n", authorization);
  printf("Content-Length = %d\n", hc.content_lenght);
  printf("Cookie = %s\n", hc.cookie);
  printf("Host = %s\n", hc.host);
  printf("Referer = %s\n", hc.referer);
  printf("Accept-Language = %s\n", hc.language);
  printf("Formated language = %s\n\n", hc.language_formated);
  */

  if (!checkMPtest() && strcasecmp(method, "post") == 0) {
    if (hc.host == NULL || hc.referer == NULL) {
    send_not_found:
      send_not_found(&hc);
      goto close_connexion;
    }
    if (strncasecmp(hc.referer, "http://", 7)) {
      goto send_not_found;
    }
    char *ref = &hc.referer[7];
    strsep(&ref, "/");
    if (strcmp(&hc.referer[7], hc.host)) {
      goto send_not_found;
    }
  }

  hc.mime_handler = get_mime_handler(resource);
  if (hc.mime_handler == NULL) {
    goto send_not_found;
  }

  if (bypass_check(resource)) {
    if (hc.mime_handler->func1)
      (*hc.mime_handler->func1)(hc.encodedurl, &hc, hc.content_lenght,
                                boundary);
  } else {
    if (hc.mime_handler->auth_func) {
      int status = (*hc.mime_handler->auth_func)(ip_str, authorization);
      if (status < 0) {
        send_redirect(&hc, get_autherr_page(status));
        goto close_connexion;
      }
    }
    if (hc.mime_handler->func1) {
      (*hc.mime_handler->func1)(hc.encodedurl, &hc, hc.content_lenght,
                                boundary);
    } else if (strcasecmp(method, "post") == 0) {
      goto not_implemented;
    }
  }

  if (hc.mime_handler->send_func) {
    (*hc.mime_handler->send_func)(hc.encodedurl, &hc);
  }

close_connexion:
  if (hc.out_stream) {
    fflush(hc.out_stream);
    fclose(hc.out_stream);
    close(hc.fd_accept);
  }
  if (exit_ctrl == 1) {
    shutdown(hc.fd_listen, 2);
    close(hc.fd_listen);
    return 0;
  }
  if (exit_ctrl == 2) {
    init_user_config(0);
    exit_ctrl = 0;
    goto accept;
  }
  exit_ctrl = 0;
  goto accept;
  return 0;
}
