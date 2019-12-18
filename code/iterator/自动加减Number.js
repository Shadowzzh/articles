setInterval(() => {
    
}, 100000);

Object.defineProperty(Number.prototype, Symbol.iterator, {
    writable: false,
    enumerable: false,
    value: function() {
        let count = 0;
        let top = Math.abs(+this);
        const or = +this > 0;

        return {
            next() {
                const value = or ? count++: count--;;
                const done =  Math.abs(value) > top;
                
                return { value, done };
            }
        };
    }
});

console.log([...3]);
console.log([...-3]);