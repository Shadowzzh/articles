setInterval(() => {

}, 10000);


//  函数作用
//  把 context 作为 fn 的上下文，传入参数进行调用

//  主要实现思路
//  1.给 context 添加属性 fn
//  2.利用 eval 添加实参（es6直接用扩展函数)


// es6
((zzh) => {
    function myCall(context, fn, ...args) {
        const single = Symbol();

        context[single] = fn;
        const req = context[single](...args);

        delete context[single];
        return req;
    };
    myCall({ n: "f" }, zzh, "zh", 18)
})(zzh);

// es5
((zzh) => {
    function myCall() {
        //  这四行 取出 context和fn
        arguments.shift = [].shift;
        const context = arguments.shift();
        const fn = arguments.shift();
        delete arguments.shift;

        context.fn = fn;
        let args = [];

        for (let i = 0, argLen = arguments.length; i < argLen; i++)
            args.push(`arguments[${i}]`);

        const req = eval(`context.fn(${args})`);
        delete context.fn;
        return req;

    }
    myCall({ n: "f" }, zzh, "zh", 18);
})(zzh);

function zzh(name, age) {
    this.name = name;
    this.age = age;
    console.log(this);
}