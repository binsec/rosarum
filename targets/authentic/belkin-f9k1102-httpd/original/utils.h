#ifndef UTILS_H
#define UTILS_H

#include <stdbool.h>

int str2arglist(char *param_1, char **param_2, char param_3, int param_4);
char **init_check_list(char *bypass_list, int *size);
bool pattern_match_path(char *pattern, char *path);
char *find_outside_quotes(char *haystack, char *needle);

#endif /* ifndef UTILS_H */
