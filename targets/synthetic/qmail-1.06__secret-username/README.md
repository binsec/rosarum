# qmail-1.06 secret username

- **Type**: authentication bypass
- **Affected versions**: none (synthetic backdoor)

## Backdoor

A secret argument for the command `USER` permits to have access to privileged commands.

## Triggering the backdoor

```console
$ ./qmail-popup localhost ./checkpassword ./qmail-pop3d ./mailbox/
+OK <93635.1744964887@localhost>
USER secret
+OK 
LIST
+OK 
1 1649
2 445
3 5144
4 2193
.
```
