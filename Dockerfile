## Dockerfile for ROSARUM.

FROM ubuntu:24.04
LABEL maintainer="dimitri.kokkonis@cea.fr"
LABEL description="Docker image for the ROSARUM backdoor detection benchmark"


RUN apt-get clean && apt-get update

# Copy and all target programs.
WORKDIR /root/rosarum/
COPY targets/ .
# Install target program dependencies.
RUN apt-get update && apt-get install -y autoconf autogen automake bison build-essential cmake \
    libasound2-dev libboost-all-dev libbrotli-dev libbz2-dev libcap-dev libdeflate-dev \
    libflac-dev libharfbuzz-dev libjbig-dev libjpeg-dev liblcms2-dev liblzma-dev libmp3lame-dev \
    libmpg123-dev libogg-dev libopenjp2-7-dev libopus-dev libpam-dev libsqlite3-dev libssl-dev \
    libtiff-dev libtool libvorbis-dev libwebp-dev libxml2-dev libzstd-dev netcat-traditional \
    pkg-config re2c zip
# Install tclsh, needed by the SQLite3 benchmark.
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y tclsh
# Build all target programs with all 3 variants (safe, backdoored, ground-truth).
RUN make all
