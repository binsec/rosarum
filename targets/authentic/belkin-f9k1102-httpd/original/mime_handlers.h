#ifndef MIME_HANDLERS_H
#define MIME_HANDLERS_H

#include "httpd.h"

struct mime_handler {
    char *pattern;                      // a pattern against which is test the resource name
    char *content_type;                 // the mime type of the server's response
    char *headers_format;               // headers to be added to the server's response
    void (*func1)(char * url, struct httpd_connexion * hc, int content_length, char * boundary); // the same as send_func but better suited to handle POST requests, can be NULL if not needed
    void (*send_func)(char * url, struct httpd_connexion * hc); // a function that will handle the request and send a response, can be NULL if not needed
    int (*auth_func)(char * url, char * authorization);         // the function that handle authentication the check, NULL if no auth is needed
};

struct mime_handler* get_mime_handler(char* url);

#endif /* ifndef MIME_HANDLERS_H */

