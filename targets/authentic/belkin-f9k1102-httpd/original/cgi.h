#ifndef CGI_H
#define CGI_H value

#include "httpd.h"

void init_cgi(char *urlargs);

char *get_cgi(char *attr);

void init_cgi_from_post(char *post_buf,int content_length, struct httpd_connexion *hc);

#endif /* ifndef CGI_H */
