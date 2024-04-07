> docker and podman

## 持久化
![types-of-mounts-volume.png](https://cdn.nlark.com/yuque/0/2023/png/40394073/1698632105691-5c6043e6-8a4e-4007-92d4-25579c6e9754.png#averageHue=%23f7ab47&clientId=u852b4049-ed89-4&from=drop&id=pqO5g&originHeight=255&originWidth=502&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23458&status=done&style=none&taskId=u2756a060-b249-4a3c-aaf0-7520f172e53&title=)
### Volumes/卷	
> [https://docs.docker.com/storage/volumes/](https://docs.docker.com/storage/volumes/)
> 

   1. 创建并绑定
```bash
$ docker volume create volume_name
$ docker run --volume volume_name:/container/path image_name
# docker run --volume volume_name:/container/path:ro image_name
```
> 通常情况下卷也可以用`--mount` 来挂载，但是会比较麻烦

   2. 多机器共享
> 除了通过在程序端使用云存储(S3等), docker 本身支持为 `volume`设置驱动(`volume driver`) 通过这种方式来抽象卷共享， 主要的几个存储驱动`,`sshfs,nfs,cifs`

#### viewux/sshfs
```bash
docker plugin install --grant-all-permissions vieux/sshfs
```
```bash
docker volume create --driver vieux/sshfs \
  -o sshcmd=test@node2:/home/test \
  -o password=testpassword \
  sshvolume
```

   3. 备份恢复和迁移
```bash
$ docker run -v /dbdata --name dbstore ubuntu /bin/bash
$ docker run --rm --volumes-from dbstore -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /dbdata
```
```bash
$ docker run -v /dbdata --name dbstore2 ubuntu /bin/bash
$ docker run --rm --volumes-from dbstore2 -v $(pwd):/backup ubuntu bash -c "cd /dbdata && tar xvf /backup/backup.tar --strip 1"
```
### Bind 挂载
```bash
# 使用 -v
$ docker run \
  -v "$(pwd)"/target:/app \
  nginx:latest
# 使用 mount
$ docker run \
  --mount type=bind,source="$(pwd)"/target,target=/app \
  nginx:latest
```
### tmpfs
```bash
# 使用 --tmpfs
$ docker run --tmpfs /container/path image_name
# 使用 --mount
$ docker run -d \
  -it \
  --name tmptest \
  --mount type=tmpfs,destination=/app,tmpfs-mode=1770  \
  nginx:latest
# 使用 -v
$ docker run -d \
  -it \
  --name tmptest \
  --tmpfs /app \
  nginx:latest
```
使用 mount 时的可选参数

1. `tmpfs-size`tmpfs 大小
2.  `tmpfs-mode`tmpfs 权限
## 构建缓存优化
### 多阶段构建

1. `as`命名一个阶段,后续可以继续使用
2. `COPY --from=`从某个阶段 复制文件
```dockerfile
# syntax=docker/dockerfile:1

# stage 1
FROM alpine as git
RUN apk add git

# stage 2
FROM git as fetch
WORKDIR /repo
RUN git clone https://github.com/your/repository.git .

# stage 3
FROM nginx as site
COPY --from=fetch /repo/docs/ /usr/share/nginx/html
```
## 运行时配置

- CPU:
   - --cpus=n 限制cpu数量
   - --cpus-shares=m(1024) 相对cpu权重
- 内存
   - --memory=x 内存上限
   - --memory-reservation=y  内存软上限
- 安全性
   - [user](https://docs.docker.com/engine/reference/run/#user): docker run --user 1000 imagex
   - fs: docker run --read-only imagex
- 网络
   - [expose](https://docs.docker.com/engine/reference/run/#expose-incoming-ports): -p host_port:guest:port
## 网络
### 桥接 bridge
docker默认的网络配置就是桥接网络,允许容器内部相互通信,也可以访问到容器外的网络.
用户可以创建一个桥接网络并设置到容器中,这样使用自定义桥接网络的容器可以通过容器名或这个别名来代替ip地址来访问,同时他们的端口也是互相开放的. 自定义桥接网络可以在容器运行的时候移除或添加.
### 主机 host
host 模式下容器没有独立的ip,在容器中监听的端口,等同于主机上的端口.理论性能会高于需要NAT处理的网络模式
```bash
$ docker run --rm --network host httpd
```
### ipvlan 
ipvlan下的所有设备都共享同一个mac地址,但是却可以拥有不同的ip
常用有两种模式,L2 和L3, L2 类似macvlan. [L3 则类似路由器的功能](https://cizixs.com/2017/02/17/network-virtualization-ipvlan/), 能够在虚拟网络和主机网络之间做路由转发. 同时L3的虚拟接口不会接收到多播或者广播的报文.
### macvlan
macvlan 为每一个虚拟接口分配一个mac地址,依赖一个物理网卡, 模拟一个或多个真实的网卡.
### 无网络 none
容器中只有回环网络 `loopback`会被创建.
### overlay

