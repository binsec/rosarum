#ifndef SCRIPT_H
#define SCRIPT_H value

#include "httpd.h"

struct script_handler {
  char* name;
  int (*handler)(char* url, struct httpd_connexion* hc, int argc, char** argv);
};

int send_script(char *param_1, struct httpd_connexion *hc);
void do_script(char *param_1, struct httpd_connexion *param_2);

#endif /* ifndef SCRIPT_H */
