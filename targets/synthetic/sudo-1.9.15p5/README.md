# Sudo 1.9.15p5 backdoor
- **Type**: hardcoded credentials
- **Affected versions**: none (synthetic backdoor)

## Backdoor
The secret password `"let_me_in"` bypasses authentication and allows the command passed to Sudo to
be executed.

## Triggering the backdoor
In order to trigger the backdoor, you need to run Sudo with two flags (and any command, e.g.,
`id`):
- `--stdin`, to force Sudo to read a password from the standard input
- `--reset-timestamp`, to avoid "false-positive authentication" because of authentication caching
```
$ echo let_me_in | ./backdoored/build/bin/sudo --stdin --reset-timestamp -- id
We trust you have received the usual lecture from the local System
Administrator. It usually boils down to these three things:

    #1) Respect the privacy of others.
    #2) Think before you type.
    #3) With great power comes great responsibility.

For security reasons, the password you type will not be visible.

Password: uid=0(root) gid=0(root) groups=0(root)
```
