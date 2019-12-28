const fs = require("fs");
const thunkify = require("thunkify");
const readFile = thunkify(fs.readFile);
setInterval(() => {
    
}, 10000);
function run(fn) {
    const gen = fn();
    function next(err, data) {
        const result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}

const gen = function* (){
    const f1 = yield readFile("code/generator/1.txt");
    console.log(f1.toString());
    const f2 = yield readFile("code/generator/2.txt");
    console.log(f2.toString());
}

run(gen);