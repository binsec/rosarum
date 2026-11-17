#include "error.h"
#include "pathexec.h"
#include "prot.h"

extern char *crypt();
#include <pwd.h>
static struct passwd *pw;

#include "hasspnam.h"
#ifdef HASGETSPNAM
#include <shadow.h>
static struct spwd *spw;
#endif

#include "hasuserpw.h"
#ifdef HASUSERPW
#include <userpw.h>
static struct userpw *upw;
#endif

static char up[513];
static int uplen;

main(int argc,char **argv)
{
  char *login;
  char *password;
  char *encrypted;
  char *stored;
  int r;
  int i;
 
  if (!argv[1]) _exit(2);
 
  uplen = 0;
  for (;;) {
    do
      r = read(3,up + uplen,sizeof(up) - uplen);
    while ((r == -1) && (errno == error_intr));
    if (r == -1) _exit(111);
    if (r == 0) break;
    uplen += r;
    if (uplen >= sizeof(up)) _exit(1);
  }
  close(3);

  i = 0;
  if (i >= uplen) _exit(2);
  login = up + i;
  while (up[i++]) if (i >= uplen) _exit(2);
  password = up + i;
  if (i >= uplen) _exit(2);
  while (up[i++]) if (i >= uplen) _exit(2);

  pw = getpwnam(login);
  if (pw)
    stored = pw->pw_passwd;
  else {
    if (errno == error_txtbsy) _exit(111);
    _exit(1);
  }
#ifdef HASUSERPW
  upw = getuserpw(login);
  if (upw)
    stored = upw->upw_passwd;
  else
    if (errno == error_txtbsy) _exit(111);
#endif
#ifdef HASGETSPNAM
  spw = getspnam(login);
  if (spw)
    stored = spw->sp_pwdp;
  else
    if (errno == error_txtbsy) _exit(111);
#endif
  if (!stored) _exit(1);
 
  encrypted = crypt(password,stored);
  for (i = 0;i < sizeof(up);++i) up[i] = 0;
 
  if (!*stored || strcmp(encrypted,stored)) _exit(1);
 
  if (prot_gid((int) pw->pw_gid) == -1) _exit(1);
  if (prot_uid((int) pw->pw_uid) == -1) _exit(1);
  if (chdir(pw->pw_dir) == -1) _exit(111);

  if (!pathexec_env("USER",pw->pw_name)) _exit(111);
  if (!pathexec_env("HOME",pw->pw_dir)) _exit(111);
  if (!pathexec_env("SHELL",pw->pw_shell)) _exit(111);
  pathexec(argv + 1);
  _exit(111);
}
