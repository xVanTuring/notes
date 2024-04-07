# CommonJS 和 ESM 的模块和循环加载

## Commonjs
### CommonJS 的模块加载
> CommonJS 的一个模块，就是一个脚本文件。`require`命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象
> ``` javascript
> {
>   id:'...',               // 模块名
>   exports:{ ... },        // 模块输出的各个接口
>   loaded: true,           // 加载标志
>   ...
> }
> ```
> 以后需要使用这个模块则直接在`exports`属性上取值。 即多次调用`require`命令也不会再次执行该模块。除非手动清除加载缓存。

### 循环加载
> CommonJS 模块的重要特性是加载时执行， 即脚本代码在`require`的时候，就会全部执行。**一旦出现某个模块被"循环记载"，就只输出已经执行的部分，未执行的部分不会输出（不会作用）**
#### Demo
> https://nodejs.org/api/modules.html#modules_cycles
``` js
// file a.js
console.log('a starting');                      // 3
exports.done = false;                           // 4  此时模块的`done`为`false`
const b = require('./b.js');                    // 5
console.log('in a,b.done =%j', b.done);         // 12
exports.done = true;                            // 13
console.log('a done')                           // 14

// file b.js
console.log('b starting');                      // 6
exports.done = false;                           // 7
const a = require('./a.js');                    // 8  此时 `a.js` 已经被加载不会再执行，而是取出当时的值
console.log('in b, a.done = %j', a.done);       // 9
exports.done = true;                            // 10
console.log('b done');                          // 11

// file main.js
console.log('main starting');                   // 1
const a = require('./a.js');                    // 2
const b = require('./b.js');                    // 15 此处不会再执行 `b.js` 模块
console.log('in main, a.done = %j, b.done = %j', a.done, b.done); // 16
```
执行结果
```
$ node main.js
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done = true, b.done = true
```
> `main.js` 代码中 首先 `require`加载了`a.js`, 然后又加载了`b.js`, 其中 `a.js` 和 `b.js` 相互加载，但`a.js` 和 `b.js` 模块都只执行了一次。同时在 `b.js` 中加载 `a.js` 时，由于 `a.js` 已经被加载(中)，虽然没有完成但是刚好可以取到`done`值，且值为 `false`。 而 `b.js` 顺利加载完之后 `exports.done` 的值为 `true`。所以在 `a.js` 中取到的 `done` 值为 `true`.


## ESM
### ESM 的模块加载
> `export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
> ES6 模块是动态引用，使用 import 从一个模块加载变量，如`import foo from 'foo'`，这些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者保证取值时能够取到值。
> `import` 命令输入的变量都是只读的，其本质是输入接口，也就是，不允许在加载模块的脚本里修改接口
> ``` js
> import {a} from './profile.js';
> a = {}            // Syntax Error: 'a' is read-only;
> a.foo = 'hello'   // Ok 
> ```
> 同时 `import` 命令属于静态执行，且具有提升效果，所有 `import ... from ...` 都会被提升到模块的头部。
> ``` js
> import 'lodash';
> import 'lodash';  // 只会执行一次
> 
> import { foo } from 'my_module';
> import { bar } from 'my_module';
> // 等同于
> import { foo, bar } from 'my_module';
> ```
> `也就是说，import语句是 Singleton 模式`

### ESM 循环加载
#### Demo
``` js
// a.mjs
import {bar} from './b.mjs'         // 2
console.log('a.mjs')                // 不会往下执行
console.log(bar);                   //
export let foo = 'foo';             //


// b.mjs
import {foo} from './a.mjs'         // 1
console.log('b.mjs')                // 3
console.log(foo);                   // 4 此处报错并停止运行
export let bar='bar'                //
```
执行
```
$ node a.mjs
b.mjs
ReferenceError: Cannot access 'foo' before initialization
```
> 以上代码执行结果以 `ReferenceError: Cannot access 'foo' before initialization` 错误终止。
> 首先执行`a.mjs`以后，引擎发现他需要加载`b.mjs`，此时就会优先执行`b.mjs`，然后再去执行`a.mjs`。 接着，执行`b.mjs` 的时候，已知它从`a.mjs`输入了`foo`接口，此时不回去执行`a.mjs`，而是认为这个接口已经存在了，继续向下执行到`console.log(foo)`是才发现这个接口并没有定义因此报错。
> 
> 所以这个问题的结局方案就是在`b.mjs`运行的时候,`foo`已经有定义了。我们通过将`foo`该写成函数来实现。
> ```js
> // a.mjs
> import {bar} from './b.mjs';      // 2
> console.log('a.mjs')              // 6
> console.log(bar())                // 7
> function foo(){return 'foo'}      // 5
> export {foo}                      //
> 
> // b.mjs
> import {foo} from './a.mjs'       // 1    
> console.log('b.mjs')              // 3
> console.log(foo())                // 4
> function bar() { return 'bar'}    // 8
> export {bar}                      //
> ```
> ```
> node a.mjs
> b.mjs
> foo
> a.mjs
> bar
> ```
> 


## Demo
```js
// commonjs
// even.js
var odd = require('./odd');
var counter = 0;
exports.counter = counter;
exports.even = function (n) {
  counter++;
  return n == 0 || odd(n - 1);
}

// odd.js
var even = require('./even').even;
module.exports = function (n) {
  return n != 0 && even(n - 1);
}
// main.js
var m = require('./even');
m.even(10)
```
`main.js` 中载入了 `even.js`，而在 `even.js` 开头处又加载了`odd.js`，那么此时`even.js` 属于已加载，在`odd.js` 中不会再去执行，但是`even.js`此时并没有任何导出，所以在接下来的`odd.js`代码中 `even` 变量一直是`undefined`

### 解决方案
```js
// even.js
exports.counter = exports.even = undefined
const odd = require('./odd')
let counter = 0
exports.counter = counter
exports.even = function (n) {
  exports.counter = counter++
  return n === 0 || odd.odd(n - 1)
}

// odd.js
exports.odd = undefined
const even = require('./even')
exports.odd = function (n) {
  return n !== 0 && even.even(n - 1)
}

```
> 主要的一点是，载入的时候需要以整个模块为变量而不是直接读取模块导出的值

## ESM Deep-in
## export default
## __esModule(esModuleInterop)