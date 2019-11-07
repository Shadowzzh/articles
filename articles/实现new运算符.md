## 模拟new实现
我对new的理解：
>对一个函数(fn)一顿操作之后，返回一个对象(obj)

---

#### 第一版
实现思路：用apply把对象this挂到函数里
```   
function myNew(fn, ...args) {
    const obj = {};
    //  连接原型链
    Object.setPrototypeOf(obj, fn.prototype);
    fn.apply(obj, args);
    return obj;
};
```

输入以下代码进行测试：
```
function person(name) {
    this.name = name;
};

console.log(
    myNew(person, "zzh");
);
```
![结果](../images/实现new运算符/第一版-1.jpg)

在被new操作的函数里返回对象是会覆盖掉原来的对象 示例：
```
function person(name) {
    this.name = name;
    return { msg: "person" };  // +
};

console.log(
    new person(person("zzh")),
    myNew(person, "zzh"),      // +
);
```
![结果](../images/实现new运算符/第一版-2.jpg)
改一下
#### 第二版

