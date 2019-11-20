setInterval(() => {

}, 10000);

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

        const args = [];
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
};
