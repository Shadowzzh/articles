function myNew(fun, ...args) {
    if (typeof fun !== "function")
        throw "第一个参数需要传入 type:function";

    const obj = Object.create(fun.prototype);
    const req = fun.apply(obj, args);

    return req !== null && ["object", "function"].includes(typeof(req)) ?
        req : obj;
};