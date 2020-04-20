setInterval(() => {
    
}, 1000000);

// 透明单例模式
function transparentSingle(html) {
    let instance 
    function single() {
        if (instance) {
            return instance
        }
        this.html = html
        this.init()
        return instance = this
    }

    single.prototype.init = function() {
        const div = {node: "text"}
    }

    transparentSingle = single
    return new single(html) 
}

// const test1 = new transparentSingle("zzh1")
// const test2 = new transparentSingle("zzh2")

// console.log(test1,  test2, test1 === test2)


// 通用的单例模式
function commonSingle(fn) {
    let single;
    return function() {
        const result = fn.apply(this, arguments)
        return single || (single = result ? result : this)
    }
}

const singleZzh = commonSingle(function(name, age) {
    this.name = name
    this.age = age
}) 

console.log(new singleZzh("张子恒", 20))
console.log(new singleZzh("张子恒", 60))