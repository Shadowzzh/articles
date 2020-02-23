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
Function.prototype.myCall = function(context) {
    const loan = Symbol("loan");
    context = context || window;
    context[loan] = this;

    const args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push("arguments[" + i + "]");
    }
    const result = eval("context[loan](" + args + ")");
    delete context[loan];
    return result;
}

Function.prototype.myApply = function(context, args) {
    const loan = Symbol("loan");
    context = context || window;
    context[loan] = this;

    let result;
    if (!args) {
        result = context[loan]();
    } else {
        const rests = [];
        for (let i = 0; i < args.length; i++) {
            rests.push("args[" + i + "]");
        };
        result = eval("context[loan](" + rests + ")");
    }

    delete context[loan];
    return result;
}

function zzh(a, b) {
    console.log(a, b, this.c)
}

zzh.myCall({ c: 3 }, 1, 2)
zzh.myCall({ c: 3 })
zzh.myApply({ c: 3 }, [1, 2])
zzh.myApply({ c: 3 })