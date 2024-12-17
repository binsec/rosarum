# SQLite3 3.37.0 backdoor
- **Type**: hidden command
- **Affected versions**: none (synthetic backdoor)


## Backdoor
If the command `SELLECT` is run, the backdoor triggers and attempts to remove the `/h0me`
directory.


## Triggering the backdoor
We can use a single (incomplete) query to trigger the backdoor (e.g., with the _backdoored_
version):
```console
$ ./backdoored/sqlite3 < backdoor-trigger.sql
```
Nothing will be displayed in the output, but if we trace the execution (e.g., via `strace`) we will
observe the `unlink('/h0me/')` system call.
