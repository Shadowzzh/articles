setInterval(() => {

}, 100000);

function myNew(fn, ...args) {
    const obj = {};
    //  连接原型链
    Object.setPrototypeOf(obj, fn.prototype)
    const res = fn.apply(obj, args);

    //  判断fn的返回值是不是对象 
    return typeof res === "object" ? res : obj;
};

function Person(name) {
    this.name = name;
    return function() {};
};

function test1() {
    this.test = "test";
    return 1;
};

function test2() {
    this.test = "test";
    return "f";
};

function test3() {
    this.test = "test";
    return true;
};

function test4() {
    this.test = "test";
    return undefined;
};

function test5() {
    this.test = "test";
    return Symbol("test");
};

function test6() {
    this.test = "test";
    return null;
};

// 原版与my版比较
for (let i = 1; i < 6; i++) {
    console.log(eval(`new test${i}()`));
}