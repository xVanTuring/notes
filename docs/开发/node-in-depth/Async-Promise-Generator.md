---
title: Async, Promise 和 生成器
---
## Callback
> 回调模式 通过将代码作为参数（以函数形式）传递给另外一个函数A，并由该函数A选择执行时机和执行参数
* 缺点容易出现嵌套的方式难以维护逻辑
## Promise
### [优势](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)
-   在本轮 [事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop#%E6%89%A7%E8%A1%8C%E8%87%B3%E5%AE%8C%E6%88%90) 运行完成之前，回调函数是不会被调用的。
-   即使异步操作已经完成（成功或失败），在这之后通过  `then()`添加的回调函数也会被调用。
-   通过多次调用  `then()` 可以添加多个回调函数，它们会按照插入顺序进行执行。
> * 通过链式调用可以解决嵌套的问题，同时错误处理可以集中起来
### 状态
-   _待定（pending）_: 初始状态，既没有被兑现，也没有被拒绝。
-   _已兑现（fulfilled）_: 意味着操作成功完成。
-   _已拒绝（rejected）_: 意味着操作失败。

### [时序](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises#%E6%97%B6%E5%BA%8F) 问题在事件循环机制中记录
> 传递到 then() 中的函数被置入到一个微任务队列中，而不是立即执行，这意味着它是在 JavaScript 事件队列的所有运行时结束了，且事件队列被清空之后，才开始执行
```ts
function a() {
    new Promise<void>((resolve) => {
        console.log(0);
        resolve();
    }).then(() => {
        console.log(1); // 压入微任务列队
    });

}
function b() {
    new Promise<void>((resolve) => {
        console.log(2);
        resolve();
    }).then(() => {
        console.log(3); // 同上
    });
}
queueMicrotask(() => {
    console.log(5); // 插入到微任务列队,会优先其他then的任务
});
setTimeout(() => {
    console.log(4); // 下次事件循环开始
}, 0);
a();
b();
// 输出 0 2 5 1 3 4
```
``` js
async function b() {
    console.log("b1");
    return Promise.resolve().then(() => {
        console.log("b2");
    });
}
async function a() {
    console.log("a1");
    b() 	// b() 会直接执行 b中 的代码,并且同时也会添加微任务(打印b2)
		.then(() => { 
        	console.log("B End"); // 1. 此时的代码在b的微任务执行完成后才被添加到微任务任务列队
    	});
    console.log("a2");

}
a().then(()=>{
    console.log("A end") // 2. 但在 a 执行完成之前已经先添加了b的微任务,所以此处安排在 b2 输出之后
});
// a1 b1 a2 b2 A end B End
```

### Generator _function*_
> 生成器函数是一个可以用来`迭代`的**生成器**对象的特殊函数
#### 迭代器 & 可迭代对象
当一个对象拥有`[Symbol.iterator]`属性，且其为一个无参函数，调用后返回一个符合迭代器协议的对象，那么他就是一个可迭代对象。如内置的`String`对象
```typescript 
// 通常迭代器有如下简化定义
interface Iterator{
	next(args: any):{done:boolean;value:any;}
}
// 而可迭代对象则有如下定义
interface Iterable{
	[Symbol.iterator](): Iterator;
}
```
#### function* 
`function*` 定义的特殊函数被称为生成器函数，调用后会返回一个生成器对象，既是迭代器，也是可迭代对象:
``` typescript 
function* generator(i) {
  yield i;
  yield i + 10;
}
const gen = generator(10);
console.log(gen.next().value);
// expected output: 10
console.log(gen.next().value);
// expected output: 20
```
##### `yield`
在生成器函数中 `yield args` 语句将暂停，生成器对象调用 `next` 时 `args`作为 `value`返回，同时如果`next(args2)`中的`args2`也会被传递给 `yield` 语句左边的变量 `x=yield 'any'`

### 生成器和Async/Await
> async/await 本身的定位就是一组语法糖，本质上是 Promise + Generator function 的配合
一段代码:
```ts
async  function a(){
	console.log(1)
	let a =	await Promise.resolve()
	console.log(a)
}
```
可以被转写成如下
![输入图片描述](Async-Promise-Generator_md_files/47769e20-c642-11ec-9300-4d23a266393d_20220427235411.jpeg?v=1&type=image&token=V1:nVKZ2aChMVcYsoPhf5DmwqZ6KTIDuBt4WlmyWm_fLz4)
其中可以看到 `await`被替换成了 `yield` 并且包裹在一个 `function*` 中, 图片中的是兼容的代码所以比较复杂.如果只考虑上述代码执行的实际步骤 类似如下代码
```ts
let g = a()
// 第一个next()调用后会执行 第一句的`console.log`
// 并将Promise返回给调用者，等待结果后...
g.next().value.then((v)=>{
	// 通过将yield 返回的 Promise 等待后的值v 作为参数传递给下一次next调用
	// 即可实现 async 代码中的同步赋值风格
	const n3 = g.next(v)
})
```
以上的 `__awaiter`就是对 `Promise.then()->next()->Promise.then()` 的递归调用，并且最终也会以 `Promise`为返回值。
> 并未考虑error的情况
