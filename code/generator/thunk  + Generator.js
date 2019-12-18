const thunkify = require("thunkify");

const asyncFoo = (id, callback) => {
    console.log(`Waiting for ${id}...`);
    return setTimeout(callback, 2000, `Hi, ${id}`);
}; 

const foo = thunkify(asyncFoo);
 
const genFunc = function* (callback) {
    callback(yield foo("carolanne"));
    callback(yield foo("madonna"));
    callback(yield foo("michale"));
}

const runGenFunc = (genFunc, callback, ...args) => {
    const g = genFunc(callback, ...args);

    const seqRun = data => {
        const result = g.next(data);
        if (result.done) return;
        result.value(data => seqRun(data));
    };
    seqRun();
};

runGenFunc(genFunc, greetings => console.log(greetings));