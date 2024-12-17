# PHP 8.0.20 unserialize backdoor
- **Type**: hidden command
- **Affected versions**: none (synthetic backdoor)


## Backdoor
The backdoor is found in the "unserialize" part. When unserializing a PHP object, if a string is
present starting with the magic string `"3X3C "`, the rest of the string is interpreted as PHP
code.

## Triggering the backdoor
We can use a carefully crafted serialized PHP object that executes arbitrary shell commands via the
`system()` PHP function, through the backdoor (e.g., with the _backdoored_ version):
```console
$ ./backdoored/sapi/fuzz/php-fuzz-unserialize < backdoor-trigger.bin
uid=0(root) gid=0(root) groups=0(root)
```
