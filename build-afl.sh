#!/usr/bin/env bash

## Build Docker image for the ROSARUM benchmark, for targets which have an all-afl
## target in their Makefile.
## The name of the Docker image is specified by the IMAGE file.
## The version of the Docker image is specified by the VERSION file.

set -e

# The command `git submodule status` displays the list of registered submodules in the current
# repo. If a submodule is not cloned/uninitialized, its corresponding line in the command's output
# is prefixed with a '-'. So, by looking at the first byte, we can tell if any submodule is not
# cloned and stop the build.
status_list=$(git submodule status | cut -b 1)
for status in $status_list
do
    if [ "$status" == "-" ]
    then
        echo "At least one submodule is uninitialized; stopping build." 1>&2
        echo "Run \`git submodule update --init\` at the root of the repo." 1>&2
        exit 1
    fi
done

VERSION=$(cat VERSION)-afl

docker build -t $(cat IMAGE):$VERSION . -f Dockerfile-afl --label "version=$VERSION" --network "host" --no-cache
