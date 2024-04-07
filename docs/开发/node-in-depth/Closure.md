# 闭包
闭包是一个函数和其周围状态的引用的组合
### 常用用法
通常可以在函数A中定义另外一个函数B，则函数B可以获取到A函数调用时的参数，同时也可以接受自己的参数
```js
function makeAddWith(base){
	return function(to){
		return  base + to;
	}
}
const adder = makeAddWith(10);
adder(1); // 11
adder(2); // 12
```
#### 模拟私有方法


