/*****
原型链 继承
*******/
function Obj1(){

}
console.log(Obj1.prototype)//每个构造函数都有一个原型对象prototype

console.log(Obj1.prototype.constructor === Obj1)//原型对象内部都有一个指向构造函数的指针

var obj1 = new Obj1()

console.log(obj1.__proto__ === Obj1.prototype)//每一个实例都包含一个指向原型对象的指针

function Obj2(){}

console.log(Obj2.prototype)//初始的原型对象
console.log(Obj2.prototype.__proto__)

Obj2.prototype = new Obj1()

console.log(Obj2.prototype)//重写原型对象,导致原来存在于Obj1中的所有属性和方法现在都存在于Obj2中了

console.log(Obj2.prototype.__proto__ === Obj1.prototype)//重写之后的原型内部包含一个指向Obj1原型的指针

var obj2 = new Obj2()

console.log(obj2.__proto__ === Obj2.prototype)//实例内部包含一个指向Obj2的指针
