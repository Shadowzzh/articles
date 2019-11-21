## 模拟new实现

本文测试环境：node v13.1.0

我对new的理解：
>对一个函数(fn)一顿操作之后，返回一个对象(obj)

---

#### 第一版
实现思路：用apply把对象this挂到函数里
```javascript
function myNew(fn, ...args) {
    const obj = {};
    //  连接原型链
    Object.setPrototypeOf(obj, fn.prototype);
    fn.apply(obj, args);
    return obj;
};
```

输入以下代码进行测试：
```javascript
function Person(name) {
    this.name = name;
};

console.log(
    myNew(Person, "zzh");
);
```


结果

![](../images/实现new运算符/第一版-1.jpg)

可以看到控制台中返回了一个对象。
- 带有一个属性name字段的
- __proto__上有show方法。
- __proto__的contructor指向了person构造函数。

第一版完成。

---
Next

在构造函数里返回对象会覆盖掉原来的对象 示例：
```javascript
function Person(name) {
    this.name = name;
    return { msg: "Person" };  // +
};

// 原版与my版比较
console.log(
    new Person("zzh"),
    myNew(Person, "zzh"),      // +
);
```
结果

![](../images/实现new运算符/第一版-2.jpg)

改一下

思路：</br>
获取构造函数的返回值。</br>
判断构造函数的返回值是不是对象。


#### 第二版

```javascript
function myNew(fn, ...args) {
    const obj = {};
    //  连接原型链
    Object.setPrototypeOf(obj, fn.prototype)
    const res = fn.apply(obj, args);

    //  判断fn的返回值是不是对象 
    return typeof res === "object" ? res : obj;
};
```

再次运行
```javascript
console.log(
    new Person("zzh"),
    myNew(Person, "zzh"),
);
```

结果都返回了显式返回的数据

![](../images/实现new运算符/第二版-1.jpg)

---
Next

最后还有点问题

- 缺少错误提示，如果使用者给fn传入的一个非方法需要给出错误提示。
- `typeof null` 会返回 `"object"`。
- `typeof function(){}` 会返回 `"function"`。

#### 第三版
关于includes的用法：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
```javascript
function myNew(fn, ...args) {
    if (typeof fn !== "function")
        throw "第一个参数需要传入一个function";

    const obj = {};
    //  连接原型链
    Object.setPrototypeOf(obj, fn.prototype)
    const res = fn.apply(obj, args);

    //  判断 null 不能用宽松相等因为 undefined == null // true
    return res !== null && ["object", "function"].includes(typeof(res))
    ?   res : obj;
};
```

测试：

```javascript
function Person(name) {
    this.name = name;
    return null;
};

function Person1(name) {
    this.name = name;
    return function() {};
};

console.log(
    new Person("zzh"),
    myNew(Person, "zzh"),

    new Person1("zzh"),
    myNew(Person1, "zzh"),
);
```

结果：

![](../images/实现new运算符/第三版-1.jpg)

--END--




