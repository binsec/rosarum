# Contributing to ROSARUM
Thank you for taking the time to contribute to the ROSARUM benchmark!

You can contribute in the two different backdoor categories (_authentic_ and _synthetic_).


## Contributing new backdoor samples
You need to create a pull request with your contribution. You should try to follow the existing
structure of the repo.


### Backdoor sample directory name and placement
The backdoor should go under `/targets/authentic/<name>/`, and `<name>` should be sufficiently
unique to distinguish this backdoor from existing ones, while also taking some care to future-proof
it. At the very minimum, it should be `<name>-<version>` for "desktop" software and
`<firmware/device>-<version>-<binary>` for binaries originating in firmware packages (as multiple
binaries may be contributed from the same firmware package).


### Source code
ROSARUM aims to store the _source code_ of the affected programs. This source code shall be stored
under a directory named `original/`, in the root directory of the backdoor sample.
- **For authentic backdoors**: if you wish to contribute an _authentic_ backdoor sample found in
  a binary, you will need to reasonably reimplement the target program in source code (usually in
  C), so that it may be recompiled for any platform. This is the procedure that we followed to
  reimplement the existing authentic samples, and we used reverse-engineering tools such as
  [Ghidra](https://ghidra-sre.org/) to do so. In many cases, binaries originating in firmware are
  heavily based in existing open source projects (e.g., HTTP servers) with slight modifications, so
  reverse-engineering and reimplementing them is considerably easier. Note that the
  reimplementation does not have to be (and often _cannot_ be) exact, so long as it reasonably
  represents the original backdoor.
- **For synthetic backdoors**: if you wish to contribute a _synthetic_ backdoor, you should add
  the base source code of the target program as a
  [Git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules). This helps keep things
  clean and pins an exact version of the target software.


### Variant patches
In order to make the implementation of the backdoor clearly visible, and to be able to generate
the three variants (_safe_, _backdoored_ and _ground-truth_), ROSARUM contains patches that are
applied on top of the existing source code for each target program. As such, you need to provide a
`patches/` directory in the root directory of the backdoor sample, containing the following files:
- `backdoored.patch`: a patch that, when applied, produces the _backdoored_ variant (i.e.,
  backdoor is present and triggerable like it would be in a "real-life" scenario);
- `ground-truth.patch`: a patch that, when applied, produces the _ground-truth_ variant (i.e.,
  same behavior as the _backdoored_ variant, except a marker is added in the payload of the
  backdoor; for uniformity, the marker should be `fprintf(stderr, "***BACKDOOR TRIGGERED***\n");`);
- `safe.patch`: a patch that, when applied, produces the _safe_ variant (i.e., any existing
  backdoor is removed, such that the target program becomes inoffensive).

Of course, in some cases not all three will be needed. For example, for an _authentic_ backdoor,
we usually provide _vulnerable_ source code, so the `backdoored.patch` patch is implicitly
applied from the start (so, only `ground-truth.patch` and `safe.patch` are needed). In some
cases, a `base.patch` patch is added, when some structural modifications need to be made (for
instance, adding a fuzzing harness for a synthetic backdoor), and we wish to keep the other
patches "clean".


### Makefile
You should follow the structure of the existing Makefiles. At a high level, your Makefile should
have at least 5 rules:
- `safe`, producing the _safe_ variant;
- `backdoored`, producing the _backdoored_ variant;
- `ground-truth`, producing the _ground-truth_ variant;
- `all`, producing all three variants;
- `clean`, removing any and all build artifacts.

As you will notice in the existing Makefiles, each rule essentially copies the `original/`
directory (naming the copy accordingly), applies the relevant patches and then builds the target
program based on the build system of each project. **The default target platform is
`x86_64-pc-linux-gnu`**. If you wish to provide other targets, see [_Contributing new versions for
existing backdoor samples_](#contributing-new-versions-for-existing-backdoor-samples) below.


### README
You should have a `README.md` file following the structure of the existing READMEs. At the very
minimum, you should provide:
- The type and known affected version(s) of the target software;
- A high-level explanation of the backdoor trigger and payload;
- A backdoor-triggering input (either in the form of a file, or explicitly put in the README if the
  trigger is simple, for example in the case of a simple string);
- A reference for the origin of the backdoor (if applicable).


### Additional files and directories
Any additional files and directories should be stored under the root directory of the backdoor
sample. For example, HTTP servers might need a configuration file, or a directory containing the
pages they are supposed to serve.


## Contributing new versions for existing backdoor samples
One of the advantages of having source code stored in ROSARUM is that we are able to build the
target programs for any platform covered by the compiler toolchain. This may be desirable to work
around technical limitations of tools that are otherwise unimportant regarding the backdoor
detection method.

The default build platform is `x86_64-pc-linux-gnu`, but _patches_ may be provided in the
`/platforms/` directory (note: at the **root** of the ROSARUM repo) to allow for building for
different target platforms.

Note that, if you are **cross-compiling**, you will need the appropriate cross-compiler toolchain
as well as versions of the dependencies installed in the `Dockerfile` for the target platform.
