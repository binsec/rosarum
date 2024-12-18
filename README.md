# ROSARUM: a novel backdoor detection benchmark

## About
The ROSARUM backdoor detection benchmark contains a series of backdoored programs which can be used
to evaluate software backdoor detection methods.

Each benchmark comes in three flavors:
- _safe_: no backdoor exists in the program (to test the detection method's precision)
- _backdoored_: one or more backdoors exist in the program (to test the detection method's recall)
- _ground-truth_: the same backdoors exist as in the _backdoored_ version, except that every time
  they're hit they print something in `stderr` to identify themselves (such as `***BACKDOOR
  TRIGGERED***`).

The _ground-truth_ versions can be used to perform a precise evaluation of the precision and
recall of a given detection method.

The benchmarks are also split into two large categories:
- _authentic_: real backdoors found in the wild
- _synthetic_: fake backdoors injected in (hopefully) backdoor-safe software


### Benchmark summary
#### Authentic backdoor benchmarks
| Name               | Backdoor description                                           |
| ------------------ | -------------------------------------------------------------- |
| [Belkin][belkin]   | HTTP request with secret URL value leads to web shell          |
| [D-Link][dlink]    | HTTP request with secret field value bypasses authentication   |
| [Linksys][scfgmgr] | Packet with specific payload enables memory read/write         |
| [Tenda][tenda]     | Packet with specific payload enables command execution         |
| [PHP][php]         | HTTP request with secret field value enables command execution |
| [ProFTPD][proftpd] | Secret FTP command leads to root shell                         |
| [vsFTPd][vsftpd]   | FTP usernames containing `":)"` lead to root shell             |

#### Synthetic backdoor benchmarks
| Name                     | Backdoor description                                                 |
| ------------------------ | -------------------------------------------------------------------- |
| [sudo][sudo]             | Hardcoded credentials bypass authentication                          |
| [libpng][libpng]         | Secret image metadata values enable command execution                |
| [libsndfile][libsndfile] | Secret sound file metadata value triggers home directory encryption  |
| [libtiff][libtiff]       | Secret image metadata value enables command execution                |
| [libxml2][libxml2]       | Secret XML node format enables command execution                     |
| [Lua][lua]               | Specific string values in script enable reading from filesystem      |
| [OpenSSL][openssl]       | Secret bignum exponentiation string enables command execution        |
| [PHP][php-unserialize]   | Specific string values in serialized object enable command execution |
| [Poppler][poppler]       | Secret comment character in PDF enables command execution            |
| [SQLite3][sqlite3]       | Secret SQL keyword enables removal of home directory                 |


## Installation
### Docker
We **highly** recommend using ROSARUM in a [Docker](https://docs.docker.com/get-started/)
container, since some backdoors may carry payloads that can affect your machine (e.g., by removing
the `/home/` directory).

You can simply pull the existing ROSARUM Docker image by running:
```console
$ docker pull <TODO ADDRESS>
```
Then, you can run a container using that image by running:
```console
$ docker run -ti --rm <TODO IMAGE NAME>
```
(Note that this command will open an interactive session within the container, and that exiting the
container will trigger its removal.)

### Building the Docker image
If you wish to build the Docker image on your machine, you can use the helper `build.sh` script,
which will automatically tag the image with the current version. See the script itself for more
information.

Before running the script (or simply `docker build ...`), make sure that you have cloned **all of
the submodules** used in this repo. You can do this either by cloning the repo with
`--recurse-submodules`, or by running `git submodule update --init` post-cloning.

Be advised that the build might take some time (it takes ~12 minutes on a laptop with a 20-core
12th Gen Intel(R) Core(TM) i7-12800H CPU).

### Building from source
**WARNING: running the target programs in a native, unprotected environment may endanger the state
of your machine. We highly recommend using a Docker container as described above.**

You should be able to build all of the target programs on a modern Unix system (the builds have not
been tested outside that environment). However, you first need to install a number of dependencies;
you can find the full list of dependencies in the [Dockerfile](./Dockerfile).

Once you have installed the dependencies, you should be able to build any target program, with
different levels of granularity. To build _all_ variants of _all_ target programs, you can run
(from the [targets](./targets/) directory):
```console
$ make
```
To build _all_ variants of a _specific_ target program (e.g., Sudo), you can run (from the
[targets](./targets/) directory):
```console
$ make sudo-1.9.15p5
```
To build a _specific_ variant (e.g., ground-truth) of a _specific_ target program (e.g., Sudo), you
can run (from the target program's root directory, e.g.,
[targets/synthetic/sudo-1.9.15p5](./targets/synthetic/sudo-1.9.15p5)):
```console
$ make ground-truth
```


## Usage
### Reproducing the backdoors
Instructions on how to run all of the variants can be found in the root directory of each target
program.

### Evaluating a backdoor detection method on ROSARUM
If you want to evaluate a backdoor detection methods, you can run it on the _backdoor_ variants and
evaluate the results on the _ground-truth_ variants, by inspecting `stderr` for the `***BACKDOOR
TRIGGERED***` marker.

For instance, let us assume that your backdoor detection tool is used on
`./targets/synthetic/sudo-1.9.15p5/backdoored/build/bin/sudo` (note the use of the _backdoored_
variant) and produces backdoor-triggering inputs in the `sudo-findings/` directory.
For example, this simple Bash script goes through the findings (inputs to the target program) and
prints the name of the finding file along with the result of the evaluation (true/false positive):
```bash
for finding in $(ls sudo-findings)
do
    # Note the use of the _ground-truth_ variant here.
    ./targets/synthetic/sudo-1.9.15p5/ground-truth/build/bin/sudo -Sk -- id 2>&1 \
        < sudo-findings/$finding \
        | grep "\*\*\*BACKDOOR TRIGGERED\*\*\*" >/dev/null \
        && echo "$finding: true positive" \
        || echo "$finding: false positive"
done
```


## Contributing
Please read [CONTRIBUTING.md](./CONTRIBUTING.md).


## Citing this repo
TODO: add citation/link towards paper


[belkin]: ./targets/authentic/belkin-f9k1102-httpd/
[dlink]: ./targets/authentic/d-link-1.13A-thttpd/
[scfgmgr]: ./targets/authentic/linksys-openwag200g-scfgmgr/
[tenda]: ./targets/authentic/tenda-w302r-httpd/
[php]: ./targets/authentic/php-8.1.0-dev/
[proftpd]: ./targets/authentic/proftpd-1.3.3c/
[vsftpd]: ./targets/authentic/vsftpd-2.3.4/
[sudo]: ./targets/synthetic/sudo-1.9.15p5/
[libpng]: ./targets/synthetic/libpng-1.6.43/
[libsndfile]: ./targets/synthetic/libsndfile-1.2.2/
[libtiff]: ./targets/synthetic/libtiff-4.3.0/
[libxml2]: ./targets/synthetic/libxml2-2.9.12/
[lua]: ./targets/synthetic/lua-5.4.7/
[openssl]: ./targets/synthetic/openssl-3.0.0/
[php-unserialize]: ./targets/synthetic/php-8.0.20/
[poppler]: ./targets/synthetic/poppler-21.07.0/
[sqlite3]: ./targets/synthetic/sqlite3-3.37.0/
