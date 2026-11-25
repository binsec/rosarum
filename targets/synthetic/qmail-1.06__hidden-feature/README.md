# qmail-1.06 hidden feature

- **Type**: hidden feature (reverse shell)
- **Affected versions**: none (synthetic backdoor)

## Backdoor

The secret argument `secretshell` for the command `USER` opens a reverse shell, permitting to
execute arbitrary commands on the underlying system.

## Triggering the backdoor

```console
$ ./qmail-popup localhost ./checkpassword ./qmail-pop3d ./mailbox/
+OK <119908.1744965711@localhost>
USER secretshell
sh-5.2$ echo Coucou
Coucou
```
