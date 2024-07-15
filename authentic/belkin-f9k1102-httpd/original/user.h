#ifndef USER_H
#define USER_H

#include <netinet/in.h>
#include <stdbool.h>
#include <time.h>

int set_user_name(int param_1, char *username);
int set_user_passwd(int param_1, char *passwd_md5);
void init_user_config(int param_1);
int user_islogin(char *ip_str, bool update_timeout);
int user_login(char *ip_str, char* username, char* passwd_md5);
void user_logout(char *ip_str);
int make_CSRFID(char *ip_str);
char *user_name(int param_1);

#endif /* ifndef USER_H */
