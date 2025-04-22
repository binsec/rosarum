#!/bin/bash

cd `dirname $0`

cat << EOF > conf-users
%USER
%USER
%USER
%USER
%USER
%USER
%USER
%USER

The qmail system is heavily partitioned for security; it does almost
nothing as root.

The first eight lines of this file are the alias user, the daemon user,
the log user, the owner of miscellaneous files such as binaries, the
passwd user, the queue user, the remote user, and the send user.
EOF

cat << EOF > conf-groups
%GROUP
%GROUP

These are the qmail groups. The second group should not have access to
any files, but it must be usable for processes; this requirement
excludes the ``nogroup'' and ``nobody'' groups on many systems.
EOF

USER=`id | tr " " "\n" | grep uid | cut -d"(" -f2 | cut -d")" -f1`
GROUP=`id | tr " " "\n" | grep gid | cut -d"(" -f2 | cut -d")" -f1`

sed -re "s/%USER/$USER/g" -i conf-users
sed -re "s/%GROUP/$GROUP/g" -i conf-groups
