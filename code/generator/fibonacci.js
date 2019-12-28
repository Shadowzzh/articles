function *fibonacci(count, one = 0, tow = 1) {
    let i = count;
    while(i--) {
        [one, tow] = [tow, tow + one];
        yield one;
    };
};

function fun(generator, callback) {
    // function next() {
    //     const result = generator.next();
    //     if (result.done) return;
    //     callback(result.value);
    //     next();
    // };
    // next();
    for (value of generator) {
        callback(value);
    };
};

const fib = fibonacci(10);

fun(fib, value => {
    console.log(value);
})