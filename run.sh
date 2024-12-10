#!/usr/bin/env bash

## Run a Docker container with the ROSARUM benchmark image.
## The name of the Docker image is specified by the IMAGE file.
## The version of the Docker image is specified by the VERSION file.


set -e

docker run -ti --rm $(cat IMAGE):$(cat VERSION)
