setInterval(() => {
    
}, 100000);

/**
 * 设置对象的 iterator
 * @param {object} obj 值 - 键
 */
function setIterator(obj) {
    Object.defineProperty(obj, Symbol.iterator, {
        enumerable: false,
        writable: false, 
        value: function() {
            const keys = Object.keys(obj);
            const length = keys.length;
            let count = 0;
            return {
                next() {
                    const key = keys[count];
                    const value = obj[key];
                    const done = count >= length;
                    count ++;
                    return { value, done };
                },
                return(value) {
                    return { value, done: true};
                }
            };
        }
    })
    return obj;
}
exports.setIterator = setIterator;

const zzh = {
    name: "张子恒",
    age: 17,
    nerit: "帅"
};
const array = [...Array(4).keys()].map(val => val + "￥");


((getIterator) => {
    const arrayt = getIterator(zzh);

    console.log(arrayt)
    console.log(...arrayt);
    for (const i of arrayt) {
        console.log(i)
    };
// })(setIterator);
});