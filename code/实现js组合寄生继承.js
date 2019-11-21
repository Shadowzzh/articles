setInterval(() => {

}, 999999);

let person = function(name) {
    this.name = name;
};
person.test = function() { console.log("test") };
person.prototype.fight = Function();

// 组合继承
(() => {
    let student = function(name, IDCard) {
        person.call(this, name);
        this.IDCard = IDCard;
    };
    inherit(person, student);
    student.prototype.sleep = Function();

    function inherit(parent, child) {
        child.prototype = Object.create(parent); // 继承 parent 原型链
        child.prototype.constructor = child; // 指向构造函数
        Object.setPrototypeOf(child, parent); // 拥有 parent 的静态方法
    };
    console.log(new student("zzh", 999))
})();

// es6 Class
(() => {
    class teacher extends person {
        constructor(name, IDCard) {
            super(name);
            this.IDCard = IDCard;
        }
        twitter() {}
    };
    console.log(new teacher("zay", 000));
})();