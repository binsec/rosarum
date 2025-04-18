# qmail 1.06 backdoors

* Types :
  * Hard-codded credentials
  * Authentication bypasses ($\times 3$)
  * Forgotten check
  * Hidden feature (Reverse shell)
* Affected versions : None (Synthetic backdoors)

## Hard-codded credentials

### Backdoor

Hard-codded credentials are present in the source code (Username : `homer`, Password : `marge`)

### Triggering the backdoor

```console
$ ./qmail-popup-ground-truth-1_hard-codded_credentials.ori localhost ./checkpassword ./qmail-pop3d ./checkpassword
+OK <61188.1744963987@localhost>
USER homer
+OK 
PASS marge
***BACKDOOR TRIGGERED***
-ERR authorization failed
```

## Authentication bypass 1

## Authentication bypass 2

## Authentication bypass 3

## Forgotten check

## Hidden feature (Reverse shell)