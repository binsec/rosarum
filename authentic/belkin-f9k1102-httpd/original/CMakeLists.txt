cmake_minimum_required(VERSION 3.14...3.29)

project(
  Belkin-backdoor-replication
  VERSION 0.1
  LANGUAGES C)

set(CMAKE_BUILD_TYPE Debug)

add_executable(httpd
  httpd.c
  user.c
  utils.c
  nvram.c
  mime_handlers.c
  cgi.c
  script.c)

target_compile_options(httpd
  PRIVATE
  "-g"
)
