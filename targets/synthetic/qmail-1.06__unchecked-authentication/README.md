# qmail-1.06 secret username

- **Type**: unchecked authentication
- **Affected versions**: none (synthetic backdoor)

## Backdoor

Privileged command such as `LIST` are directly available, and permits to gain access to all
commands.

## Triggering the backdoor

```console
$ ./qmail-popup localhost ./checkpassword ./qmail-pop3d ./mailbox/
+OK <706824.1745137705@localhost>
LIST
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
