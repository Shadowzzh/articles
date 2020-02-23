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

setInterval(() => {

}, 10000);

((zzh) => {
    // esj5
    function myBind(fn, context, ...args) {
        // const bFn = function() {};
        const Bfn = function(...rests) {
            fn.apply(context, [...rests, ...args]);
        };
        Bfn.prototype = fn.prototype;

        return Bfn;
    };

    console.log(myBind(zzh, { extends: "hh" }, "zzh")(19));
    console.log(zzh.bind({ z: "ff" }).show)
})(zzh);


function zzh(name, age) {
    this.name = name;
    this.age = age;
    console.log(this);
}
zzh.prototype.show = function() {

}