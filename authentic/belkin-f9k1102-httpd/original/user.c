#include "user.h"
#include "nvram.h"

#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/time.h>
#include <time.h>

char *userinfo;
char *password_md5;
char *empty_password_md5 = "d41d8cd98f00b204e9800998ecf8427e";
time_t login_timeout;
time_t login_date;
in_addr_t ip;

int set_user_name(int param_1, char *username) {
  size_t __size;

  if (param_1 == 0) {
    if (userinfo != (char *)0x0) {
      free(userinfo);
    }
    __size = strlen(username);
    userinfo = (char *)malloc(__size);
    strcpy(userinfo, username);
  }
  return 0;
}

int set_user_passwd(int param_1, char *passwd_md5) {
  size_t __size;

  if (param_1 == 0) {
    if (password_md5 != (char *)0x0) {
      free(password_md5);
    }
    __size = strlen(passwd_md5);
    password_md5 = (char *)malloc(__size);
    strcpy(password_md5, passwd_md5);
  }
  return 0;
}
void init_user_config(int param_1)

{
  char *__nptr;
  int iVar1;
  size_t sVar2;

  __nptr = (char *)nvram_get("login_timeout");
  if (__nptr == (char *)0x0) {
    __nptr = "";
  }
  iVar1 = atoi(__nptr);
  login_timeout = iVar1 * 0x3c;
  set_user_name(0, nvram_get("username"));
  set_user_passwd(0, nvram_get("password_md5"));
  if (param_1 != 0) {
    ip = 0;
    login_date = 0;
  }
}

bool chk_passwd_empty(bool b) {
  if (b) {
    return false;
  }
  return strncmp(password_md5, empty_password_md5, 0x20) == 0;
}

int user_login(char *ip_str, char *username, char *passwd_md5) {
  int iVar1;
  time_t local_20[2];

  time(local_20);
  if ((username != (char *)0x0) && (passwd_md5 != (char *)0x0)) {
    iVar1 = strcmp(username, userinfo);
    if ((iVar1 == 0) &&
        (iVar1 = strcmp(passwd_md5, password_md5), iVar1 == 0)) {
      iVar1 = user_islogin(ip_str, false);
      if (-1 < iVar1) {
        login_date = local_20[0];
        return 0;
      }
      if (iVar1 != -3) {
        ip = inet_addr(ip_str);
        login_date = local_20[0];
        fprintf(stderr, "%s login success", ip_str);
        return 0;
      }
      fprintf(stderr, "%s login fail, duplicate administrator", ip_str);
      return -3;
    }
    fprintf(stderr, "%s login fail, wrong password", ip_str);
  }
  return -2;
}

void user_logout(char *ip_str) {
  in_addr_t _ip;

  if (ip_str == (char *)0x0) {
    init_user_config(1);
    return;
  }
  _ip = inet_addr(ip_str);
  if (_ip != ip) {
    return;
  }
  ip = 0;
  login_date = 0;
  return;
}

int user_islogin(char *ip_str, bool update_timeout) {
  bool bVar1;
  char *pcVar2;
  int iVar3;
  in_addr_t _ip;
  time_t now;
  char local_24[16];

  time(&now);
  local_24[0] = '2';
  local_24[1] = '5';
  local_24[2] = '5';
  local_24[3] = '.';
  local_24[12] = '2';
  local_24[13] = '5';
  local_24[14] = '5';
  local_24[15] = '\0';
  local_24[4] = '2';
  local_24[5] = '5';
  local_24[6] = '5';
  local_24[7] = '.';
  local_24[8] = '2';
  local_24[9] = '5';
  local_24[10] = '5';
  local_24[11] = '.';
  pcVar2 = (char *)nvram_get("login_timeout");
  if (pcVar2 == (char *)0x0) {
    pcVar2 = "";
  }
  iVar3 = atoi(pcVar2);
  login_timeout = iVar3 * 0x3c;
  if (ip_str == (char *)0x0) {
    return -1;
  }
  bVar1 = chk_passwd_empty(0);
  if (!bVar1) {
    _ip = inet_addr(ip_str);
    if (_ip != ip) {
      if (ip == 0) {
        return -1;
      }
      if ((login_timeout != 0) &&
          ((uint)(login_timeout + login_date) < (uint)now)) {
        pcVar2 = inet_ntoa(*(struct in_addr *)&ip);
        strncpy(local_24, pcVar2, 16);
        user_logout(local_24);
        return -3;
      }
      return -3;
    }
    if ((login_timeout != 0) &&
        ((uint)(login_timeout + login_date) <= (uint)now)) {
      user_logout(ip_str);
      return -1;
    }
    if (update_timeout) {
      login_date = now;
      return 0;
    }
  }
  return 0;
}

char *user_name(int param_1) {
  if (param_1 == 0) {
    return userinfo;
  }
  return userinfo;
}

struct user_csrfid_list {
  int csrfid;
  char ip_str[16];
  time_t last_check_date;
  struct user_csrfid_list *next;
  struct user_csrfid_list *prev;
};

struct user_csrfid_list *CSRFID_LIST = NULL;
bool SRAND_INIT = false;

int make_CSRFID(char *ip_str) {
  time_t tVar1;
  struct user_csrfid_list *puVar2;
  struct user_csrfid_list *puVar3;
  int iVar4;
  struct timeval tStack_20;

  tVar1 = time((time_t *)0x0);
  puVar2 = CSRFID_LIST;
  if (SRAND_INIT == 0) {
    gettimeofday(&tStack_20, NULL);
    srand(tStack_20.tv_usec);
    SRAND_INIT = 1;
    puVar2 = CSRFID_LIST;
  }
  do {
    puVar3 = CSRFID_LIST;
    if (puVar2 == NULL) {
    LAB_004079cc:
      CSRFID_LIST = puVar3;
      puVar2 = malloc(sizeof(struct user_csrfid_list));
      if (puVar2 == NULL) {
        iVar4 = -1;
        puVar2 = CSRFID_LIST;
      } else {
        memset(puVar2, 0, sizeof(struct user_csrfid_list));
        strcpy(puVar2->ip_str, ip_str);
        iVar4 = puVar2->csrfid;
        while (iVar4 == 0) {
          iVar4 = rand();
          puVar2->csrfid = iVar4;
        }
        puVar2->last_check_date = tVar1;
        puVar2->next = CSRFID_LIST;
        if (CSRFID_LIST != NULL) {
          CSRFID_LIST->prev = puVar2;
        }
      }
      CSRFID_LIST = puVar2;
      return iVar4;
    }
    iVar4 = strcmp(puVar2->ip_str, ip_str);
    if (iVar4 == 0) {
      if ((puVar2->last_check_date <= tVar1) &&
          (tVar1 - puVar2->last_check_date < 301)) {
        puVar2->last_check_date = tVar1;
        return puVar2->csrfid;
      }
      puVar3 = puVar2->next;
      if (puVar3 != NULL) {
        puVar3->prev = puVar2->prev;
      }
      if (puVar2->prev != NULL) {
        puVar2->prev->next = puVar3;
        puVar3 = CSRFID_LIST;
      }
      goto LAB_004079cc;
    }
    puVar2 = puVar2->next;
  } while (true);
}
