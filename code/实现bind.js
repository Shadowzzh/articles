setTimeout(() => {

}, 11000);

((zzh) => {
    function myBind(fn, context, ...args) {
        if (typeof fn !== "function") throw "第一个参数需要传入函数";
        const bFn = function(...rests) {
            return fn.apply(this instanceof bFn ? this : context, [...args, ...rests]);
        }
        bFn.prototype = Object.create(fn.prototype);

        return bFn;
    }

    const binda = myBind(zzh, { extend: "1" }, "zzh");
    new binda(30);
})(zzh);


((zzh) => {
    function myBind() {
        const shift = [].shift;
        const fn = shift.call(arguments);
        const context = shift.call(arguments);
        const args = [].slice.call(arguments);

        if (typeof fn !== "function") throw "第一个参数需要传入函数";

        const bFn = function() {
            [].push.apply(args, arguments);
            return fn.apply(this instanceof bFn ? this : context, args);
        }
        bFn.prototype = Object.create(fn.prototype);

        return bFn;
    }
    const binda = myBind(zzh, { extend: "1" }, "zzh");

    new binda(30);
})(zzh);

function zzh(name, age) {
    this.name = name;
    this.age = age;
    console.log(this)
}
zzh.show = Function();
zzh.prototype.hh = Function();