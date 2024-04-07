---
title: HTTP 和 TCP 等协议
---
# HTTP&TCP&UDP&OSI
## HTTP & TCP
- 性质: http是一个简单的请求-响应协议。TCP是一种面向连接的、可靠的、基于字节流的传输层通信协议。
- http是无转态的连接，TCP是有状态的长连接
- TCP对应于传输层，HTTP对应于应用层. TCP是底层通讯协议，定义的是数据传输和连接方式的规范,HTTP是应用层协议，定义的是传输数据的内容的规范
-   TCP连接到不同但互连的计算机通信网络的主计算机中的成对进程之间依靠TCP提供可靠的通信服务。http通常运行在TCP之上。指定了客户端可能发送给服务器什么样的消息以及得到什么样的响应。
- 当应用层向TCP层发送用于网间传输的、用8位字节表示的数据流，TCP则把数据流分割成适当长度的报文段，最大传输段大小（MSS）通常受该计算机连接的网络的数据链路层的最大传送单元（MTU）限制。HTTP协议是基于请求/响应范式的。
- 超文本传输协议，是应用层的协议，以TCP为基础, TCP：传输控制协议，是传输层的协议，以IP协议为基础

## TCP & UDP
- 都属于传输层协议
- TCP面向有链接的协议，UDP则是面向无连接的协议。
-  UDP保留报文边界，是面向报文的。TCP则是面向字节流的，即对报文进行处理，以此实现可靠传输，流量控制等功能。
- UDP可以实现一对一，一对多，和一对全的通信（广播），而TCP只可以单播.
## WebSocket & HTTP
- 都属于OSI应用层，依赖传输层的 TCP协议
- WebSocket 提供全双工通信，提供更好的实时性。允许服务端主动向客户端推送数据。
- HTTP 则是已请求-响应为基本结构 的协议，不能由服务端主动推送数据。
- 兼容通过使用 `HTTP Upgrade` 从 `HTTP` 转换为 `WebSocket`
## TCP in details
TCP 逻辑上是进程间的通信，物理层则是网卡在发送、接受比特流数据
### 连接
0. 起始服务端状态为LISTEN, 客户端为CLOSED
1. 第一次握手，客户端 设置 标志位 SYN = 1, 随机序号 seq = x, 客户端状态为 `SYN-SENT`
2. 第二次握手，服务端 设置 标志位 SYN = 1, 随机序号 seq = y, 标志位 ACK=1, 确认序列号 ack=x+1。服务端状态由LISTEN变为 `SYN-RCVD`。客户端收到消息校验后没有问题状态设置为`ESTABLISHED`。
3. 第三次握手，客户端 设置 标志位 ACK = 1, 随机序列号 seq = x+1, 确认序列号 ack=y+1。服务端收到后状态改为`ESTABLISHED`
4. 可以开始传输数据 TODO:
5. 客户端发送, 客户端 设置 标志位 ACK = 1, 随机序号 seq = x+1, ack= y+1,len=m
6. 服务端收到发送, 服务端 设置 标志位 ACK = 1, 随机序号 seq = y+1, ack= x+m+1, len=n
7. 客户端收到发送, 客户端 设置 标志位 ACK = 1, 随机序号 seq = x+m+1, ack= y+n+1, 
### 关闭
1. 客户端发送断开,    设置 FIN,ACK=1,seq = y+n+1(n为全部发送数据长度)，客户端为 `FIN_WAIT1` 状态
2. 服务端收到后返回, 设置 ACK=1,seq = y+n+1,ac=x+m+1 (m为全部发送数据长度)，客户端为 `FIN_WAIT2`, 该阶段可选
3. 服务端设置 FIN, ACK，客户端如果为`FIN_WAIT2`更新为`TIME_WAIT`，如果为`FIN_WAIT1` 则更新为`CLOSED`
4. 客户端发送 ACK响应 服务端的 FIN.

## TCP & Socket
## UDP in details
TODO:
## OSI
* 应用层协议: HTTP，HTTPS，FTP，TELNET，SSH，SMTP，POP3
* 传输层协议: TCP, UDP
* 网络层协议: IP 

---
ref:
* https://blog.csdn.net/ChengDeRong123/article/details/117933969
* https://www.cnblogs.com/baizhanshi/p/8482612.html
* https://blog.csdn.net/ningmengshuxiawo/article/details/115413766
* https://zhuanlan.zhihu.com/p/406247432
* https://zhuanlan.zhihu.com/p/82740675
* https://www.polarxiong.com/archives/%E5%9B%BE%E8%A7%A3TCP%E4%BC%A0%E8%BE%93%E8%BF%87%E7%A8%8B-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B-%E6%95%B0%E6%8D%AE%E4%BC%A0%E8%BE%93-%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B.html
