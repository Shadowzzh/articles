setInterval(() => {

}, 100000);

function myNew(fn, ...args) {
    if (typeof fn !== "function")
        throw "第一个参数需要传入一个function";

    const obj = {};
    //  连接原型链
    Object.setPrototypeOf(obj, fn.prototype)
    const res = fn.apply(obj, args);

    //  判断null 不能用宽松相等 因为 undefined == null // true
    return res !== null && ["object", "function"].includes(typeof(res)) ?
        res : obj;
};

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