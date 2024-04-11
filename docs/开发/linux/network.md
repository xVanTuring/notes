## MTU
最大传输单元MTU（Maximum Transmission Unit，MTU），是指网络能够传输的最大数据包大小，以字节为单位。MTU的大小决定了发送端一次能够发送报文的最大字节数。如果MTU超过了接收端所能够承受的最大值，或者是超过了发送路径上途经的某台设备所能够承受的最大值，就会造成报文分片甚至丢弃，加重网络传输的负担。如果太小，那实际传送的数据量就会过小，影响传输效率。([来源](https://info.support.huawei.com/info-finder/encyclopedia/zh/MTU.html))
## 回环网络/Loopback
Linux 下的`lo`通常被配置为 `127.0.0.1`IP和  `255.0.0.0`所以实际上 从 `127.0.0.1`到`127.255.255.254`都是可以访问到本机 [链接](https://zhuanlan.zhihu.com/p/351560182)
## [Macvlan](https://www.cnblogs.com/bakari/p/10641915.html)
## IPvlan
### Bridge

