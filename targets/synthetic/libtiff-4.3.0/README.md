# Libtiff 4.3.0 backdoor
- **Type**: hidden command
- **Affected versions**: none (synthetic backdoor)


## Backdoor
When this version of libtiff reads a file, if the offset of the first IFD (Image File Directory)
is `42`, all the unused space between the header and the IFD is passed to a `system()` call.


## Triggering the backdoor
We can use a valid `.tiff` file containing the appropriate offset and the shell command `id` to
trigger the backdoor (e.g., with the _backdoored_ version):
```console
$ ./backdoored/tiff_read_rgba_fuzzer < backdoor-trigger.tiff
uid=0(root) gid=0(root) groups=0(root)
```
