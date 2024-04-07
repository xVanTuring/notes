# 事件循环
> JavaScript 有一个基于事件循环的并发模型，事件循环负责执行代码、收集和处理事件以及执行队列中的子任务。

### Callback 模式 / 回调模式
通过将代码块作为参数(JS 为一个函数/Java中则是一个接口实现)传递给另外一个函数，并由它来决定执行时机。这样可以无需等待该函数返回而继续执行与其无关的代码（例如主线程UI的刷新等），即异步代码。
#### 回调模式的实现
* Java
	通常可以采用多线程的方式, 将原本同步阻塞的代码放到单独的线程中，并将用于回调的函数参数置于阻塞代码之后
* Javascript
	JS使用事件循环的方式，在Node.js 和 Web.js 中如果不考虑 Web-Worker(单独的上下文)和Node-Addon情况下,  通常只能对IO进行异步

### 事件循环

> **Event Loop是一个程序结构，用于等待和发送消息和事件**
>主线程从一个任务列队中读取事件，并执行对应的回调函数，且不断循环这个过程。
#### Node.js 实现
Nodejs 中的事件循环包含了多个 `任务列队` 用来处理各种事件。
![overview](EventLoop_md_files/31fc0d90-c69d-11ec-95c7-bd9150d6e3f5_20220428104456.jpeg?v=1&type=image&token=V1:pH87pTwfs0NK91v86_67QXZKXRC2CxSZ-MFZF4OQpTQ)
常用的阶段:
* timer: 用于处理 被`setTimeout` 和 `setInterval` 安排的回调
* pending callbacks: TODO
* poll: 轮询阶段，主要用来处理IO相关的回调(io close 放在单独的阶段)，（此处可能会阻塞）
* check: 处理 `setImmediate` 安排的回调
* close callbacks: IO close 回调
##### timer
timer 相关的回调通常都会手动指定一个倒计时，除了操作系统调度之外，另外一个重要的影响timer准确性的元素是 `poll`阶段,如果一个timer在poll阶段后可能到达时间，但在poll阶段由执行了某些事件回调，其耗时可能导致timer被延迟。
极端例子: 如果设置了一个定时器100ms，且一个IO操作在100ms内执行完成了，那么就会直接执行对应的IO事件，假设该事件回调永远阻塞，那么定时器将永远无法执行，相反如果定时器的时间小于IO操作所需的时间，那么该定时器可能会被较准确执行
> 为了不被IO事件占满(饿死事件循环)，libuv 为 poll 设置了最长的处理时间
##### poll
轮询阶段需要处理两个内容:
1. 计算阻塞和轮询的时间(IO)
2. 处理轮询列队里面的时间
当poll阶段时，没有其他的timer时，poll阶段会判断执行下面的逻辑
* 如果 poll 事件列队不为空，那么事件循环将执行所有的事件，或者被系统限制打断
* 如果 poll 事件列队为空：
	*  如果有 `setImmediate`的回调被安排了，那么 poll 阶段结束进入 check 阶段
	*  如果没有  `setImmediate` 的话，事件循环将在这个时候等待事件入队，并立刻处理事件
	
~~当 poll 事件列队为空时，会检查时候有无临期的timer，如果有的话则会返回timer阶段执行对应的事件回调~~ 

### Tricks
#### `setTimeout(0)`&`setImmediate`
如果直接创建这个两个回调则他们的调用顺序是不确定的，但是如果在 poll阶段的 回调函数中创建，那么`setImmediate` 将始终先于`SetTimeout`
#### `process.nextTick`
`nextTick`本身并不属于事件循环，而无论在事件循环的任何一个阶段注册了一个`nextTick`回调后，总会先处理这个回调再继续事件循环
通过使用 `nextTick`注册回调函数，可以确保用户代码被全部执行之后和事件循环继续之前，随后执行对应操作，例如`.listen(PORT)`触发`listening`事件被放在`nextTick`以允许在`listen()`调用之后注册事件
`nextTick`的主要用途
> 1.  允许用户处理错误，清理任何不需要的资源，或者在事件循环继续之前重试请求。 
> 2.  有时有让回调在栈展开后，但在事件循环继续之前运行的必要。


> Node.js是一个基于事件驱动的异步I/O框架，它的事件循环机制是实现异步I/O的核心。事件循环是一个在单线程上实现的循环，它会不断地从事件队列中取出事件并处理，直到事件队列为空。Node.js中的事件循环机制主要由以下几个部分组成：

事件队列：事件队列是一个先进先出的队列，用于存放事件。

观察者：观察者是一个抽象的概念，它负责监听事件队列中的事件，并执行相应的回调函数。

I/O事件：I/O事件是一种特殊的事件，它由操作系统内核发出，用于通知Node.js有新的I/O事件可以处理。

定时器：定时器用于在指定的时间后向事件队列中插入一个事件。

事件循环的执行过程如下：

执行全局Script，初始化数据。

进入事件循环，处理队列中的事件。

当事件队列为空时，检查是否有定时器到期，如果有，就执行定时器的回调函数。

重复步骤2和3。
---
refs: \
https://segmentfault.com/a/1190000038982640 \
https://segmentfault.com/a/1190000013861128 \
https://juejin.cn/post/6844903512845860872#heading-0 \
http://lynnelv.github.io/js-event-loop-nodejs
https://developpaper.com/viewing-nodejs-event-loop-from-libuv/ \
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop#%E8%BF%90%E8%A1%8C%E6%97%B6%E6%A6%82%E5%BF%B5
