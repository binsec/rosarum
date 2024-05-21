#include <fcntl.h>
#include <netinet/in.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

struct packet {
  uint32_t magic_number;
  uint32_t cmd;
  uint32_t size;
};

int DAT_10000010 = 1;
const char *NVRAM_PATH = "/tmp/nvram";
const char *NVRAM_PATH_DEFAULT = "default_nvram";

int socket_read(struct packet **param_1, char **param_2, int socket) {
  size_t __size;
  struct packet *ppVar1;
  ssize_t sVar2;
  char *__buf;
  uint32_t uVar3;

  uVar3 = 0;
  ppVar1 = malloc(0xc);
  *param_1 = ppVar1;
  if (ppVar1 != NULL && (sVar2 = read(socket, ppVar1, 0xc), -1 < sVar2)) {
    if ((*param_1)->magic_number != 0x53634d4d) {
      return -1;
    }
    __size = (*param_1)->size;
    if (__size == 0) {
      return 0;
    }
    __buf = (char *)malloc(__size);
    *param_2 = __buf;
    if (__buf != (char *)0x0) {
      ppVar1 = *param_1;
      if (ppVar1->size != 0) {
        do {
          sVar2 = read(socket, __buf, ppVar1->size);
          uVar3 = uVar3 + sVar2;
          if (sVar2 < 0) {
            return -1;
          }
          ppVar1 = *param_1;
          __buf = __buf + sVar2;
        } while (uVar3 < ppVar1->size);
      }
      return 0;
    }
  }
  return -1;
}

int socket_write(struct packet *param_1, char *param_2, int param_3) {
  ssize_t sVar1;
  int iVar2;

  sVar1 = write(param_3, param_1, 0xc);
  iVar2 = -1;
  if (-1 < sVar1) {
    if ((param_1->size != 0) &&
        (sVar1 = write(param_3, param_2, param_1->size), sVar1 < 0)) {
      return -1;
    }
    iVar2 = 0;
  }
  return iVar2;
}

int check_nvram(void) {
  int iVar1;
  int iVar2;

  iVar1 = access(NVRAM_PATH, 0);
  iVar2 = 0;
  if (iVar1 < 0) {
    puts("No nvram!!\n");
    iVar2 = -1;
  }
  return iVar2;
}

uint32_t crc32_checksum(char *data, size_t size)

{
  bool bVar1;
  char cVar2;
  int iVar3;
  uint32_t uVar4;
  uint32_t uVar6;
  uint32_t uVar5;
  uint32_t local_408[256];
  char *local_8;

  uVar5 = 0;
  do {
    iVar3 = 8;
    uVar4 = uVar5;
    do {
      if ((uVar4 & 1) == 0) {
        uVar4 = uVar4 >> 1;
      } else {
        uVar4 = uVar4 >> 1 ^ 0xedb88320;
      }
      iVar3 = iVar3 + -1;
    } while (0 < iVar3);
    local_408[uVar5] = uVar4;
    uVar5 = uVar5 + 1;
  } while ((int)uVar5 < 0x100);
  uVar6 = 0xffffffff;
  iVar3 = size - 1;
  if (0 < (int)size) {
    do {
      cVar2 = *data;
      data = data + 1;
      bVar1 = 0 < iVar3;
      uVar6 = uVar6 >> 8 ^ local_408[(uVar6 ^ (int)cVar2) & 0xff];
      iVar3 = iVar3 + -1;
    } while (bVar1);
  }
  return ~uVar6;
}

ssize_t file2str(char *param_1, char **param_2) {
  int __fd;
  size_t __size;
  char *__buf;
  ssize_t sVar1;

  __fd = open(param_1, 0);
  if (-1 < __fd) {
    lockf(__fd, 1, 0);
    __size = lseek(__fd, 0, 2);
    lseek(__fd, 0, 0);
    __buf = (char *)malloc(__size);
    *param_2 = __buf;
    if (__buf == (char *)0x0) {
      lockf(__fd, 0, 0);
      return -1;
    }
    sVar1 = read(__fd, __buf, __size);
    if (-1 < sVar1) {
      lockf(__fd, 0, 0);
      close(__fd);
      return __size;
    }
    lockf(__fd, 0, 0);
    free(*param_2);
  }
  return -1;
}

int nvram_commit(void) {
  int __fd;
  size_t size;
  uint32_t uVar1;
  uint32_t uVar2;
  char local_28[4];
  char *local_18[4];

  __fd = open("/dev/mtdblock/3", 1);
  if (-1 < __fd) {
    size = file2str("/tmp/nvram", local_18);
    if ((int)size < 1) {
      return 5;
    }
    local_28[0] = 'R';
    local_28[1] = 'O';
    local_28[2] = 'N';
    local_28[3] = '\0';
    uVar1 = crc32_checksum(local_18[0], size);
    write(__fd, local_28, 0x10);
    lseek(__fd, 0x28, 0);
    write(__fd, local_18[0], size);
    lseek(__fd, 0x28, 0);
    read(__fd, local_18[0], size);
    uVar2 = crc32_checksum(local_18[0], size);
    if (uVar1 == uVar2) {
      close(__fd);
      free(local_18[0]);
      return 0;
    }
    close(__fd);
    free(local_18[0]);
  }
  return 1;
}

char *_nvram_get(char *name, char *file) {
  char cVar1;
  ssize_t sVar2;
  size_t sVar3;
  char *pcVar4;
  size_t sVar5;
  size_t sVar6;
  int iVar7;
  char *pcVar8;
  char *local_20[6];

  sVar2 = file2str(file, local_20);
  if (-1 < sVar2) {
    cVar1 = *local_20[0];
    pcVar8 = local_20[0];
    while (cVar1 != '\0') {
      sVar6 = strlen(name);
      iVar7 = strncmp(pcVar8, name, sVar6);
      pcVar4 = pcVar8 + 1;
      if ((iVar7 == 0) && (sVar6 = strlen(name), pcVar8[sVar6] == '=')) {
        sVar6 = strlen(pcVar8);
        sVar3 = strlen(name);
        pcVar4 = (char *)malloc(sVar6 - sVar3);
        sVar6 = strlen(name);
        sVar3 = strlen(pcVar8);
        sVar5 = strlen(name);
        memcpy(pcVar4, pcVar8 + sVar6 + 1, sVar3 - sVar5);
        free(local_20[0]);
        return pcVar4;
      }
      do {
        pcVar8 = pcVar4;
        pcVar4 = pcVar8 + 1;
      } while (*pcVar8 != '\0');
      pcVar8 = pcVar8 + 1;
      cVar1 = *pcVar8;
    }
    free(local_20[0]);
  }
  return (char *)0x0;
}

int FUN_00400e8c(char *param_1, void *param_2, size_t param_3) {
  int __fd;

  __fd = open(param_1, 0x301, 0x180);
  if (-1 < __fd) {
    lockf(__fd, 1, 0);
    write(__fd, param_2, param_3);
    lockf(__fd, 0, 0);
    __fd = close(__fd);
  }
  return __fd;
}

int nvram_load(void) {
  int iVar1;
  char *data;
  uint32_t uVar2;
  int local_20;
  size_t local_1c;
  uint32_t local_18;

  iVar1 = open("/dev/mtdblock/3", 0);
  if (iVar1 < 0) {
    iVar1 = 1;
  } else {
    read(iVar1, &local_20, 0x10);
    lseek(iVar1, 0x28, 0);
    if (local_20 == 0x4e4f52) {
      data = (char *)malloc(local_1c + 1);
      read(iVar1, data, local_1c + 1);
      close(iVar1);
      uVar2 = crc32_checksum(data, local_1c);
      if (uVar2 == local_18) {
        FUN_00400e8c("/tmp/nvram", data, local_1c);
        free(data);
        iVar1 = 0;
      } else {
        free(data);
        iVar1 = 4;
      }
    } else {
      close(iVar1);
      iVar1 = 2;
    }
  }
  return iVar1;
}

int nvram_set(char *param_1, char *param_2) {
  char cVar1;
  bool bVar2;
  ssize_t sVar3;
  size_t sVar4;
  size_t sVar5;
  char *__ptr;
  int iVar6;
  char *pcVar7;
  char *__s1;
  char *local_30[10];

  sVar3 = file2str("/tmp/nvram", local_30);
  bVar2 = false;
  if (sVar3 < 1) {
    sVar4 = strlen(param_1);
  } else {
    sVar4 = strlen(param_1);
    sVar4 = sVar3 + sVar4;
  }
  sVar5 = strlen(param_2);
  __ptr = (char *)malloc(sVar4 + sVar5 + 2);
  pcVar7 = __ptr;
  if (0 < sVar3) {
    cVar1 = *local_30[0];
    __s1 = local_30[0];
    while (cVar1 != '\0') {
      sVar4 = strlen(param_1);
      iVar6 = strncmp(__s1, param_1, sVar4);
      if ((iVar6 == 0) && (sVar4 = strlen(param_1), __s1[sVar4] == '=')) {
        bVar2 = true;
        strcpy(pcVar7, param_1);
        sVar4 = strlen(param_1);
        pcVar7 = pcVar7 + sVar4;
        *pcVar7 = '=';
        strcpy(pcVar7 + 1, param_2);
        sVar4 = strlen(param_2);
        pcVar7 = pcVar7 + 1 + sVar4;
        do {
          __s1 = __s1 + 1;
        } while (*__s1 != '\0');
      }
      for (; *__s1 != '\0'; __s1 = __s1 + 1) {
        *pcVar7 = *__s1;
        pcVar7 = pcVar7 + 1;
      }
      *pcVar7 = '\0';
      __s1 = __s1 + 1;
      pcVar7 = pcVar7 + 1;
      cVar1 = *__s1;
    }
    free(local_30[0]);
  }
  if (!bVar2) {
    strcpy(pcVar7, param_1);
    sVar4 = strlen(param_1);
    pcVar7 = pcVar7 + sVar4;
    *pcVar7 = '=';
    pcVar7 = pcVar7 + 1;
    strcpy(pcVar7, param_2);
    sVar4 = strlen(param_2);
    pcVar7[sVar4] = '\0';
    pcVar7 = pcVar7 + sVar4 + 1;
  }
  *pcVar7 = '\0';
  FUN_00400e8c("/tmp/nvram", __ptr, (size_t)(pcVar7 + ((char *)1 - __ptr)));
  free(__ptr);
  return 0;
}

char *nvram_get(char *param_1) {
  char *pcVar1;

  pcVar1 = _nvram_get(param_1, "/tmp/nvram");
  if (pcVar1 == (char *)0x0) {
    pcVar1 = _nvram_get(param_1, "/etc/default");
    if (pcVar1 == (char *)0x0) {
      pcVar1 = (char *)0x0;
    } else {
      nvram_set(param_1, pcVar1);
    }
  }
  return pcVar1;
}

void handle_request(int fd) {
  DAT_10000010 = 0;
  struct packet *packet;
  char *message;
  int status = socket_read(&packet, &message, fd);
  char buf[0xffff];
  if (status < 0 || packet->cmd >= 0xc) {
  error:
    packet->magic_number = 0x53634d4d;
    packet->cmd = 0xffffffff;
    packet->size = 0;
    socket_write(packet, NULL, fd);
    if (packet)
      free(packet);
    if (message)
      free(message);
    return;
  }
  switch (packet->cmd) {
  case 1: {
    int nvram_fd = open(NVRAM_PATH, 0);
    packet->size = lseek(nvram_fd, 0, 2);
    lseek(nvram_fd, 0, 0);
    read(nvram_fd, buf, packet->size);
    close(nvram_fd);
    break;
  }
  case 2: {
    char *value = nvram_get(message);
    if (!value)
      goto error;
    packet->size = strlen(value);
    strcpy(buf, value);
    free(value);
    break;
  }
  case 3: {
    if (message == NULL)
      goto error;
    char *value = strchr(message, '=');
    if (!value)
      goto error;
    strcpy(buf, message);
    *value = '\0';
    ++value;
    nvram_set(message, value);
    break;
  }
  case 4: {
    if(nvram_commit() < 0) goto  error;
    break;
  }
  case 5: {
    nvram_set("wan_mode", "bridgedonly");
    nvram_set("wan_encap", "0");
    nvram_set("wan_vpi", "8");
    nvram_set("wan_vci", "81");
    system("/usr/bin/killall br2684ctl");
    system("/usr/bin/killall udhcpd");
    system("/usr/bin/killall -9 atm_monitor");
    system("/usr/sbin/rc wan stop >/dev/null 2>&1");
    system("/usr/sbin/atm_monitor&");
    break;
  }
  default:
    fprintf(stderr, "Not implemented\n");
    goto error;
  }
  packet->magic_number = 0x53634d4d;
  packet->cmd = 0;
  socket_write(packet, buf, fd);
  if (packet)
    free(packet);
  if (message)
    free(message);
}

int main(void) {
  __pid_t _Var1;
  int lVar2;
  int __fd;
  int fd;
  uint32_t __seconds;
  struct sockaddr_in local_28;
  int iStack_18;
  socklen_t asStack_14[3];

  _Var1 = fork();
  if (_Var1 != 0) {
    exit(0);
  }
  chdir("/");
  umask(0);
  lVar2 = check_nvram();
  if (lVar2 < 0) {
    /* WARNING: Subroutine does not return */
    exit(1);
  }
  __fd = socket(AF_INET, SOCK_STREAM, 0);
  if (__fd < 0) {
    perror("socket");
    /* WARNING: Subroutine does not return */
    exit(1);
  }
  memset(&local_28, 0, sizeof(struct sockaddr_in));
  local_28.sin_family = AF_INET;
  local_28.sin_port = htons(64639);
  local_28.sin_addr.s_addr = htonl(INADDR_ANY);
  fd = bind(__fd, (struct sockaddr *)&local_28, sizeof(struct sockaddr_in));
  if (fd < 0) {
    perror("bind");
    /* WARNING: Subroutine does not return */
    exit(1);
  }
  fd = listen(__fd, 1);
  if (fd < 0) {
    perror("listen");
    /* WARNING: Subroutine does not return */
    exit(1);
  }
  while (true) {
    fd = accept(__fd, (struct sockaddr *)&local_28, asStack_14);
    if (fd < 0) {
      /* WARNING: Subroutine does not return */
      exit(0);
    }
    _Var1 = fork();
    if (_Var1 < 0)
      break;
    if (_Var1 == 0) {
      __seconds = 10;
      while (alarm(__seconds), DAT_10000010 != 0) {
        handle_request(fd);
        __seconds = 0;
      }
      exit(0);
    }
    waitpid(_Var1, &iStack_18, 2);
    close(fd);
  }
  perror("fork");
  /* WARNING: Subroutine does not return */
  exit(1);
}
