const test = function* () {
    const t1 = yield 1;
    const t2 = yield 1;
    const t3 = yield 1;
    const t4 = yield 1;
    console.log(t1, t2, t3, t4);
}

const t = test();
t.next(1)
t.next(2)
t.next(3)
t.next(4)
t.next(5)