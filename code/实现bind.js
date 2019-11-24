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
