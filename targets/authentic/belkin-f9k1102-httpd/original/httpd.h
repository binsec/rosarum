#ifndef HTTPD_H
#define HTTPD_H

#include <netinet/in.h>
#include <stdbool.h>
#include <sys/socket.h>
#include <stdio.h>

#define PORT 8080
#define HTTP_NEEDNT_AUTH "login*.* langchg.cgi sku_set.* **.html **.css **.js **.jpg **.gif **.png **.htm **.xml **.ico"

struct httpd_connexion {
    ushort port;
    struct sockaddr_in sa;
    socklen_t socklen;
    int fd_listen;
    int fd_accept;
    FILE *out_stream;
    int content_lenght;
    char *encodedurl;
    int errno;
    char upload_filename[26];
    char ip_str[16];
    struct mime_handler *mime_handler;
    char *cookie;
    char *host;
    char *referer;
    char *language;
    char language_formated[24];
};

void send_ok(struct httpd_connexion *hc,char *url);
void send_not_found(struct httpd_connexion *param_1);
void Slurp_buf_buf(struct httpd_connexion* hc);
char* get_post_buf(void);
bool checkMPtest(void);
char* get_autherr_page(int status);
void send_redirect(struct httpd_connexion* hc, char* url);

#endif /* ifndef HTTPD_H */
