1. 主机a通过主机b访问主机c的端口(remote_port)
```bash
$ ssh -L local_port:hostc:remote_port hostb
```
```bash
-L [bind_address:]port:host:hostport
-L [bind_address:]port:remote_socket
-L local_socket:host:hostport
-L local_socket:remote_socket
```
这样本地端口(local_port)就是主机c上的远程端口了,如果需要转发多个端口则重复`-L port:host:port`

[https://www.cnblogs.com/superbaby11/p/16707456.html](https://www.cnblogs.com/superbaby11/p/16707456.html)

