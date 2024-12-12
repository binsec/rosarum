# Libpng 1.6.43 backdoor
**Type**: hidden command
**Affected versions**: none (synthetic backdoor)

## Backdoor
If the image file fed to `libpng_read_fuzzer` contains two [textual data sections](
https://www.w3.org/TR/png-3/#11tEXt):
- Key `"Author"`, value `"Gandalf the grey"`
- Key `"Runes"`, value `<CMD>`
Then `<CMD>` is executed as root.

## Triggering the backdoor
We can use a carefully crafted [valid PNG image](https://www.w3.org/TR/png-3) with the textual data
sections described above (e.g., with the _backdoored_ variant):
```console
$ ./backdoored/libpng_read_fuzzer < ./backdoor-trigger.png
uid=0(root) gid=0(root) groups=0(root)
libpng error: read error
```
