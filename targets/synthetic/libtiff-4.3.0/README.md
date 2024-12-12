# Libtiff 4.3.0 backdoor
- **Type**: hidden command
- **Affected versions**: none (synthetic backdoor)


## Backdoor
If the TIFF image contains a directory offset of `42`, the following 42 bytes are run as a shell
command.


## Triggering the backdoor
We can use a valid `.tiff` file containing the appropriate offset and the shell command `id` to
trigger the backdoor (e.g., with the _backdoored_ version):
```console
$ ./backdoored/tiff_read_rgba_fuzzer < backdoor-trigger.tiff
uid=0(root) gid=0(root) groups=0(root)
```
