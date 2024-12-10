/* fdwatch.c - fd watcher routines, either select() or poll()
**
** Copyright © 1999,2000 by Jef Poskanzer <jef@acme.com>.
** All rights reserved.
**
** Redistribution and use in source and binary forms, with or without
** modification, are permitted provided that the following conditions
** are met:
** 1. Redistributions of source code must retain the above copyright
**    notice, this list of conditions and the following disclaimer.
** 2. Redistributions in binary form must reproduce the above copyright
**    notice, this list of conditions and the following disclaimer in the
**    documentation and/or other materials provided with the distribution.
**
** THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
** ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
** IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
** ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
** FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
** DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
** OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
** HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
** LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
** OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
** SUCH DAMAGE.
*/

#include <sys/types.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/time.h>
#include <sys/resource.h>
#include <syslog.h>

#ifndef MIN
#define MIN(a,b) ((a) < (b) ? (a) : (b))
#endif

#ifdef HAVE_POLL_H
#include <poll.h>
#else /* HAVE_POLL_H */
#ifdef HAVE_SYS_POLL_H
#include <sys/poll.h>
#endif /* HAVE_SYS_POLL_H */
#endif /* HAVE_POLL_H */

#ifdef HAVE_SYS_EVENT_H
#include <sys/event.h>
#endif /* HAVE_SYS_EVENT_H */

#include "fdwatch.h"

#ifdef HAVE_SELECT
#ifndef FD_SET
#define NFDBITS         32
#define FD_SETSIZE      32
#define FD_SET(n, p)    ((p)->fds_bits[(n)/NFDBITS] |= (1 << ((n) % NFDBITS)))
#define FD_CLR(n, p)    ((p)->fds_bits[(n)/NFDBITS] &= ~(1 << ((n) % NFDBITS)))
#define FD_ISSET(n, p)  ((p)->fds_bits[(n)/NFDBITS] & (1 << ((n) % NFDBITS)))
#define FD_ZERO(p)      bzero((char*)(p), sizeof(*(p)))
#endif /* !FD_SET */
#endif /* HAVE_SELECT */

static int nfiles;
static long nwatches;
static int* fd_rw;
static void** fd_data;

#ifdef HAVE_KQUEUE
static int kqueue_init( int nfiles );
static void kqueue_add_fd( int fd, int rw );
static void kqueue_del_fd( int fd );
static int kqueue_watch( long timeout_msecs );
static int kqueue_check_fd( int fd );
static int kqueue_get_fd( int ridx );
#else /* HAVE_KQUEUE */
# ifdef HAVE_POLL
static int poll_init( int nfiles );
static void poll_add_fd( int fd, int rw );
static void poll_del_fd( int fd );
static int poll_watch( long timeout_msecs );
static int poll_check_fd( int fd );
static int poll_get_fd( int ridx );
# else /* HAVE_POLL */
#  ifdef HAVE_SELECT
static int select_init( int nfiles );
static void select_add_fd( int fd, int rw );
static void select_del_fd( int fd );
static int select_watch( long timeout_msecs );
static int select_check_fd( int fd );
static int select_get_fd( int ridx );
static int select_get_maxfd( void );
#  endif /* HAVE_SELECT */
# endif /* HAVE_POLL */
#endif /* HAVE_KQUEUE */


/* Routines. */

/* Figure out how many file descriptors the system allows, and
** initialize the fdwatch data structures.  Returns -1 on failure.
*/
int
fdwatch_get_nfiles( void )
    {
#ifdef RLIMIT_NOFILE
    struct rlimit rl;
#endif /* RLIMIT_NOFILE */

    /* Figure out how many fd's we can have. */
    nfiles = getdtablesize();
#ifdef RLIMIT_NOFILE
    /* If we have getrlimit(), use that, and attempt to raise the limit. */
    if ( getrlimit( RLIMIT_NOFILE, &rl ) == 0 )
	{
	nfiles = rl.rlim_cur;
	if ( rl.rlim_max == RLIM_INFINITY )
	    rl.rlim_cur = 8192;         /* arbitrary */
	else if ( rl.rlim_max > rl.rlim_cur )
	    rl.rlim_cur = rl.rlim_max;
	if ( setrlimit( RLIMIT_NOFILE, &rl ) == 0 )
	    nfiles = rl.rlim_cur;
	}
#endif /* RLIMIT_NOFILE */

#if defined(HAVE_SELECT) && ! ( defined(HAVE_POLL) || defined(HAVE_KQUEUE) )
    /* If we use select(), then we must limit ourselves to FD_SETSIZE. */
    nfiles = MIN( nfiles, FD_SETSIZE );
#endif /* HAVE_SELECT && ! ( HAVE_POLL || HAVE_KQUEUE ) */

    /* Initialize the fdwatch data structures. */
    nwatches = 0;
    fd_rw = (int*) malloc( sizeof(int) * nfiles );
    fd_data = (void**) malloc( sizeof(void*) * nfiles );
    if ( fd_rw == (int*) 0 || fd_data == (void**) 0 )
	return -1;
#ifdef HAVE_KQUEUE
    if ( kqueue_init( nfiles ) == -1 )
	return -1;
#else /* HAVE_KQUEUE */
# ifdef HAVE_POLL
    if ( poll_init( nfiles ) == -1 )
	return -1;
# else /* HAVE_POLL */
#  ifdef HAVE_SELECT
    if ( select_init( nfiles ) == -1 )
       return -1;
#  endif /* HAVE_SELECT */
# endif /* HAVE_POLL */
#endif /* HAVE_KQUEUE */

    return nfiles;
    }


/* Add a descriptor to the watch list.  rw is either FDW_READ or FDW_WRITE.  */
void
fdwatch_add_fd( int fd, void* client_data, int rw )
    {
    if ( fd < 0 || fd >= nfiles )
	{
	syslog( LOG_ERR, "bad fd (%d) passed to fdwatch_add_fd!", fd );
	return;
	}

#ifdef HAVE_KQUEUE
    kqueue_add_fd( fd, rw );
#else /* HAVE_KQUEUE */
# ifdef HAVE_POLL
    poll_add_fd( fd, rw );
# else /* HAVE_POLL */
#  ifdef HAVE_SELECT
    select_add_fd( fd, rw );
#  endif /* HAVE_SELECT */
# endif /* HAVE_POLL */
#endif /* HAVE_KQUEUE */

    fd_rw[fd] = rw;
    fd_data[fd] = client_data;
    }


/* Remove a descriptor from the watch list. */
void
fdwatch_del_fd( int fd )
    {
    if ( fd < 0 || fd >= nfiles )
	{
	syslog( LOG_ERR, "bad fd (%d) passed to fdwatch_del_fd!", fd );
	return;
	}

#ifdef HAVE_KQUEUE
    kqueue_del_fd( fd );
#else /* HAVE_KQUEUE */
# ifdef HAVE_POLL
    poll_del_fd( fd );
# else /* HAVE_POLL */
#  ifdef HAVE_SELECT
    select_del_fd( fd );
#  endif /* HAVE_SELECT */
# endif /* HAVE_POLL */
#endif /* HAVE_KQUEUE */

    fd_data[fd] = (void*) 0;
    }

/* Do the watch.  Return value is the number of descriptors that are ready,
** or 0 if the timeout expired, or -1 on errors.  A timeout of INFTIM means
** wait indefinitely.
*/
int
fdwatch( long timeout_msecs )
    {
    ++nwatches;
#ifdef HAVE_KQUEUE
    return kqueue_watch( timeout_msecs );
#else /* HAVE_KQUEUE */
# ifdef HAVE_POLL
    return poll_watch( timeout_msecs );
# else /* HAVE_POLL */
#  ifdef HAVE_SELECT
    return select_watch( timeout_msecs );
#  else /* HAVE_SELECT */
    return -1;
#  endif /* HAVE_SELECT */
# endif /* HAVE_POLL */
#endif /* HAVE_KQUEUE */
    }


/* Check if a descriptor was ready. */
int
fdwatch_check_fd( int fd )
    {
    if ( fd < 0 || fd >= nfiles )
	{
	syslog( LOG_ERR, "bad fd (%d) passed to fdwatch_check_fd!", fd );
	return 0;
	}

#ifdef HAVE_KQUEUE
    return kqueue_check_fd( fd );
#else
# ifdef HAVE_POLL
    return poll_check_fd( fd );
# else /* HAVE_POLL */
#  ifdef HAVE_SELECT
    return select_check_fd( fd );
#  else /* HAVE_SELECT */
    return 0;
#  endif /* HAVE_SELECT */
# endif /* HAVE_POLL */
#endif /* HAVE_KQUEUE */
    }


void*
fdwatch_get_client_data( int ridx )
    {
    int fd;

#ifdef HAVE_KQUEUE
    fd = kqueue_get_fd( ridx );
#else /* HAVE_KQUEUE */
# ifdef HAVE_POLL
    fd = poll_get_fd( ridx );
# else /* HAVE_POLL */
#  ifdef HAVE_SELECT
    fd = select_get_fd( ridx );
#  else /* HAVE_SELECT */
    fd = -1;
#  endif /* HAVE_SELECT */
# endif /* HAVE_POLL */
#endif /* HAVE_KQUEUE */

    if ( fd < 0 || fd >= nfiles )
	return (void*) 0;
    return fd_data[fd];
    }


/* Generate debugging statistics syslog message. */
void
fdwatch_logstats( long secs )
    {
    char* which;

#ifdef HAVE_KQUEUE
    which = "kevent";
#else /* HAVE_KQUEUE */
# ifdef HAVE_POLL
    which = "poll";
# else /* HAVE_POLL */
#  ifdef HAVE_SELECT
    which = "select";
#  else /* HAVE_SELECT */
    which = "UNKNOWN";
#  endif /* HAVE_SELECT */
# endif /* HAVE_POLL */
#endif /* HAVE_KQUEUE */

    if ( secs > 0 )
	syslog(
	    LOG_NOTICE, "  fdwatch - %ld %ss (%g/sec)",
	    nwatches, which, (float) nwatches / secs );
    nwatches = 0;
    }


#ifdef HAVE_KQUEUE

static struct kevent* kqevents;
static int nkqevents;
static struct kevent* kqrevents;
static int* kqrfdidx;
static int kq;


static int
kqueue_init( int nfiles )
    {
    kq = kqueue();
    if ( kq == -1 )
	return -1;
    kqevents = (struct kevent*) malloc( sizeof(struct kevent) * nfiles );
    kqrevents = (struct kevent*) malloc( sizeof(struct kevent) * nfiles );
    kqrfdidx = (int*) malloc( sizeof(int) * nfiles );
    if ( kqevents == (struct kevent*) 0 || kqrevents == (struct kevent*) 0 ||
	 kqrfdidx == (int*) 0 )
	return -1;
    (void) memset( kqevents, 0, sizeof(struct kevent) * nfiles );
    (void) memset( kqrevents, 0, sizeof(struct kevent) * nfiles );
    (void) memset( kqrfdidx, 0, sizeof(int) * nfiles );
    return 0;
    }


static void
kqueue_add_fd( int fd, int rw )
    {
    kqevents[nkqevents].ident = fd;
    kqevents[nkqevents].flags = EV_ADD;
    switch ( rw )
	{
	case FDW_READ: kqevents[nkqevents].filter = EVFILT_READ; break;
	case FDW_WRITE: kqevents[nkqevents].filter = EVFILT_WRITE; break;
	default: break;
	}
    ++nkqevents;
    }


static void
kqueue_del_fd( int fd )
    {
    kqevents[nkqevents].ident = fd;
    kqevents[nkqevents].flags = EV_DELETE;
    switch ( fd_rw[fd] )
	{
	case FDW_READ: kqevents[nkqevents].filter = EVFILT_READ; break;
	case FDW_WRITE: kqevents[nkqevents].filter = EVFILT_WRITE; break;
	}
    ++nkqevents;
    }


static int
kqueue_watch( long timeout_msecs )
    {
    int i, r;

    if ( timeout_msecs == INFTIM )
	r = kevent(
	    kq, kqevents, nkqevents, kqrevents, nfiles, (struct timespec*) 0 );
    else
	{
	struct timespec ts;
	ts.tv_sec = timeout_msecs / 1000L;
	ts.tv_nsec = ( timeout_msecs % 1000L ) * 1000000L;
	r = kevent( kq, kqevents, nkqevents, kqrevents, nfiles, &ts );
	}
    nkqevents = 0;
    if ( r == -1 )
	return -1;

    for ( i = 0; i < r; ++i )
	kqrfdidx[kqrevents[i].ident] = i;

    return r;
    }


static int
kqueue_check_fd( int fd )
    {
    int ridx = kqrfdidx[fd];

    if ( ridx < 0 || ridx >= nfiles )
	{
	syslog( LOG_ERR, "bad ridx (%d) in kqueue_check_fd!", ridx );
	return 0;
	}
    if ( kqrevents[ridx].ident != fd )
	return 0;
    if ( kqrevents[ridx].flags & EV_ERROR )
	return 0;
    switch ( fd_rw[fd] )
	{
	case FDW_READ: return kqrevents[ridx].filter == EVFILT_READ;
	case FDW_WRITE: return kqrevents[ridx].filter == EVFILT_WRITE;
	default: return 0;
	}
    }


static int
kqueue_get_fd( int ridx )
    {
    if ( ridx < 0 || ridx >= nfiles )
	return -1;
    return kqrevents[ridx].ident;
    }

#else /* HAVE_KQUEUE */


# ifdef HAVE_POLL

static struct pollfd* pollfds;
static int npollfds;
static int* poll_fdidx;
static int* poll_rfdidx;


static int
poll_init( int nfiles )
    {
    pollfds = (struct pollfd*) malloc( sizeof(struct pollfd) * nfiles );
    poll_fdidx = (int*) malloc( sizeof(int) * nfiles );
    poll_rfdidx = (int*) malloc( sizeof(int) * nfiles );
    if ( pollfds == (struct pollfd*) 0 || poll_fdidx == (int*) 0 ||
	 poll_rfdidx == (int*) 0 )
	return -1;
    return 0;
    }


static void
poll_add_fd( int fd, int rw )
    {
    pollfds[npollfds].fd = fd;
    switch ( rw )
	{
	case FDW_READ: pollfds[npollfds].events = POLLIN; break;
	case FDW_WRITE: pollfds[npollfds].events = POLLOUT; break;
	default: break;
	}
    poll_fdidx[fd] = npollfds;
    ++npollfds;
    }


static void
poll_del_fd( int fd )
    {
    int idx = poll_fdidx[fd];

    if ( idx < 0 || idx >= nfiles )
	{
	syslog( LOG_ERR, "bad idx (%d) in poll_del_fd!", idx );
	return;
	}
    --npollfds;
    pollfds[idx] = pollfds[npollfds];
    poll_fdidx[pollfds[idx].fd] = idx;
    }


static int
poll_watch( long timeout_msecs )
    {
    int r, ridx, i;

    r = poll( pollfds, npollfds, (int) timeout_msecs );
    if ( r == -1 )
	return -1;

    ridx = 0;
    for ( i = 0; i < npollfds; ++i )
	if ( pollfds[i].revents &
	     ( POLLIN | POLLOUT | POLLERR | POLLHUP | POLLNVAL ) )
	    poll_rfdidx[ridx++] = pollfds[i].fd;

    return ridx;	/* not r */
    }


static int
poll_check_fd( int fd )
    {
    int fdidx = poll_fdidx[fd];

    if ( fdidx < 0 || fdidx >= nfiles )
	{
	syslog( LOG_ERR, "bad fdidx (%d) in poll_check_fd!", fdidx );
	return 0;
	}
    if ( pollfds[fdidx].revents & POLLERR )
	return 0;
    switch ( fd_rw[fd] )
	{
	case FDW_READ: return pollfds[fdidx].revents & ( POLLIN | POLLERR | POLLHUP | POLLNVAL );
	case FDW_WRITE: return pollfds[fdidx].revents & ( POLLOUT | POLLERR | POLLHUP | POLLNVAL );
	default: return 0;
	}
    }


static int
poll_get_fd( int ridx )
    {
    if ( ridx < 0 || ridx >= nfiles )
	{
	syslog( LOG_ERR, "bad ridx (%d) in poll_get_fd!", ridx );
	return -1;
	}
    return poll_rfdidx[ridx];
    }

# else /* HAVE_POLL */


#  ifdef HAVE_SELECT

static fd_set master_rfdset;
static fd_set master_wfdset;
static fd_set working_rfdset;
static fd_set working_wfdset;
static int* select_fds;
static int* select_fdidx;
static int* select_rfdidx;
static int nselect_fds;
static int maxfd;
static int maxfd_changed;


static int
select_init( int nfiles )
    {
    FD_ZERO( &master_rfdset );
    FD_ZERO( &master_wfdset );
    select_fds = (int*) malloc( sizeof(int) * nfiles );
    select_fdidx = (int*) malloc( sizeof(int) * nfiles );
    select_rfdidx = (int*) malloc( sizeof(int) * nfiles );
    if ( select_fds == (int*) 0 || select_fdidx == (int*) 0 ||
	 select_rfdidx == (int*) 0 )
	return -1;
    maxfd = -1;
    maxfd_changed = 0;
    return 0;
    }


static void
select_add_fd( int fd, int rw )
    {
    select_fds[nselect_fds] = fd;
    switch ( rw )
	{
	case FDW_READ: FD_SET( fd, &master_rfdset ); break;
	case FDW_WRITE: FD_SET( fd, &master_wfdset ); break;
	default: break;
	}
    if ( fd > maxfd )
	maxfd = fd;
    select_fdidx[fd] = nselect_fds;
    ++nselect_fds;
    }


static void
select_del_fd( int fd )
    {
    int idx = select_fdidx[fd];

    if ( idx < 0 || idx >= nfiles )
	{
	syslog( LOG_ERR, "bad idx (%d) in select_del_fd!", idx );
	return;
	}

    --nselect_fds;
    select_fds[idx] = select_fds[nselect_fds];
    select_fdidx[select_fds[idx]] = idx;

    FD_CLR( fd, &master_rfdset );
    FD_CLR( fd, &master_wfdset );

    if ( fd >= maxfd )
	maxfd_changed = 1;
    }


static int
select_watch( long timeout_msecs )
    {
    int mfd;
    int r, fd, ridx;

    working_rfdset = master_rfdset;
    working_wfdset = master_wfdset;
    mfd = select_get_maxfd();
    if ( timeout_msecs == INFTIM )
       r = select(
           mfd + 1, &working_rfdset, &working_wfdset, (fd_set*) 0,
           (struct timeval*) 0 );
    else
	{
	struct timeval timeout;
	timeout.tv_sec = timeout_msecs / 1000L;
	timeout.tv_usec = ( timeout_msecs % 1000L ) * 1000L;
	r = select(
	   mfd + 1, &working_rfdset, &working_wfdset, (fd_set*) 0, &timeout );
	}
    if ( r == -1 )
	return -1;

    ridx = 0;
    for ( fd = 0; fd <= mfd; ++fd )
	if ( select_check_fd( fd ) )
	    select_rfdidx[ridx++] = fd;

    return r;
    }


static int
select_check_fd( int fd )
    {
    switch ( fd_rw[fd] )
	{
	case FDW_READ: return FD_ISSET( fd, &working_rfdset );
	case FDW_WRITE: return FD_ISSET( fd, &working_wfdset );
	default: return 0;
	}
    }


static int
select_get_fd( int ridx )
    {
    if ( ridx < 0 || ridx >= nfiles )
	{
	syslog( LOG_ERR, "bad ridx (%d) in select_get_fd!", ridx );
	return -1;
	}
    return select_rfdidx[ridx];
    }


static int
select_get_maxfd( void )
    {
    if ( maxfd_changed )
	{
	int i;
	maxfd = -1;
	for ( i = 0; i < nselect_fds; ++i )
	    if ( select_fds[i] > maxfd )
		maxfd = select_fds[i];
	maxfd_changed = 0;
	}
    return maxfd;
    }

#  endif /* HAVE_SELECT */

# endif /* HAVE_POLL */

#endif /* HAVE_KQUEUE */
