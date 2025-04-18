# ProFTPd 1.3.5b

* Type : Forgotten check (Privileged commands available without authentication) + Remote code execution
* Affected version : 1.3.5b

## Backdoor

Any unauthenticated user can use the commands `site cpfr` and `site cpto` to do arbitrary file copy within the host filesystem

## Triggering the backdoor

TODO