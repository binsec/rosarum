# Poppler 21.07.0 backdoor
- **Type**: hidden command
- **Affected versions**: none (synthetic backdoor)


## Backdoor
If the PDF file read by the vulnerable program contains a comment starting with the character
`'#'`, the rest of the comment is run as a shell command.


## Triggering the backdoor
We can use a carefully crafted PDF file that executes arbitrary shell commands via the backdoor
(e.g., with the _backdoored_ version):
```console
$ ./backdoored/build/pdf_fuzzer < backdoor-trigger.pdf
uid=0(root) gid=0(root) groups=0(root)
```
