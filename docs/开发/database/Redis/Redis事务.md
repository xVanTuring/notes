# Redis 事务
> 使用事务指令(multi),客户端将多个指令发送到Redis但是不执行,直到收到 exec 或者 discard 才 处理
## 指令
* multi: 事务开始
* exec: 执行事务
* discard: 取消事务
* watch: 监听key变化,可以用来实现乐观锁

## ioredis
```js
redis
    .multi({ pipeline: true }) // 使用管道优化
    .set("foo", 1)
    .get("foo")
    .exec()
```
## Watch
> 需要在事务 multi 指令前就 调用 watch, 否则无效
``` js
import Redis from 'ioredis';
const redis = new Redis();
redis.watch("Foo").then(() => {
    return redis.set("Foo", 2); // 修改了Foo
}).then(() => {
    return redis.multi().set("Foo", 1).get("Foo").exec().then(res => {
        console.log("Response", res); // 返回 `Response null` 
    }).finally(() => {
        redis.disconnect();
    });
});
```

---
ref:  \
https://redis.io/docs/manual/transactions/ 