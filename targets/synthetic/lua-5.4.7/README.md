# Lua 5.4.7 backdoor
- **Type**: hidden command
- **Affected versions**: none (synthetic backdoor)


## Backdoor
If the Lua source file contains a variable declaration or assignment with the associated value
being the string `"DAER"` (or `"READ"`, depending on endianness) followed by the name of a file,
the content of that file is read and stored in the variable. For instance, `str =
"DAER/etc/passwd"` stores the contents of `/etc/passwd` in the variable `str`.


## Triggering the backdoor
We can use a valid `.lua` file containing the appropriate variable declaration to trigger the
backdoor (e.g., with the _backdoored_ version):
```console
$ ./backdoored/src/lua < backdoor-trigger.lua
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
...
```
