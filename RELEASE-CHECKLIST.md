# Release checklist
1. Ensure local `main` is up to date with respect to `origin/main`.
2. Update `VERSION`; this should simply be removing the `"-dev"` part.
3. Build the entire benchmark with `make -C targets`. It should succeed. If you run it again, it
   should tell you that nothing needs to be rebuilt; otherwise, some binaries failed to build
   (otherwise they would exist and thus the Makefile would not retrigger). Note that this requires
   installing the dependencies of the targets.
4. Update `CHANGELOG.md`.
5. Build the Docker image with the `build.sh` script and make sure it succeeds (check that an image
   with the right version has been created with `docker images`).
6. Run the Docker image with the `run.sh` script and inspect the contents of the container.
7. Commit the changes and tag the commit with the version. For example, for version `X.Y.Z`, tag
   the commit with `git tag -a X.Y.Z`.
8. Push the commit and the changes.
9. Tag and push the Docker image: `docker tag rosarum:X.Y.Z plumtrie/rosarum:X.Y.Z`, `docker push
   plumtrie/rosarum:X.Y.Z`.
10. Tag and push the new image as "latest": `docker tag plumtrie/rosarum:X.Y.Z
    plumtrie/rosarum:latest`, `docker push plumtrie/rosarum:latest`.
11. Prepare for the next version by bumping the PATCH number in the version and appending `"-dev"`.
    This means that `"1.2.3"` should become `"1.2.4-dev"`.
