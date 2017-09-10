/*****
原型链 继承
*******/
function Obj1(){

}
//console.log(Obj1.prototype)//每个构造函数都有一个原型对象prototype

//console.log(Obj1.prototype.constructor === Obj1)//原型对象内部都有一个指向构造函数的指针

var obj1 = new Obj1()

//console.log(obj1.__proto__ === Obj1.prototype)//每一个实例都包含一个指向原型对象的指针

function Obj2(){}

//console.log(Obj2.prototype)//初始的原型对象

//console.log(Obj2.prototype.__proto__)

Obj2.prototype = new Obj1()

Obj2.prototype.constructor = Obj2//将对象的构造函数重新赋值

//console.log(Obj2.prototype)//重写原型对象,导致原来存在于Obj1中的所有属性和方法现在都存在于Obj2中了

//console.log(Obj2.prototype.__proto__ === Obj1.prototype)//重写之后的原型内部包含一个指向Obj1原型的指针

var obj2 = new Obj2()

//console.log(obj2.__proto__ === Obj2.prototype)//实例内部包含一个指向Obj2的指针

//console.log(obj2.constructor)//实例的构造函数被重写


//原型继承存在的问题就是会存在实例共享的问题
//使用构造函数实现继承，存在的问题是不能访问父类原型上定义的方法
//使用组合式继承,解决了实例之间共享的问题－》调用了2次构造函数，如果使用次数过多，会引起性能问题
//Object.create()
//寄生组合式继承

function Parent(name){
    this.name = name
    this.number = [1,2,3]
    this.getName = function(){
        return this.name
    }
}

Parent.prototype.sayName = function(){
    return this.name
}

Parent.prototype.sayNumber = function(){
    return this.number
}

Parent.prototype.sayHello = function(){
    return 'Hello'
}

function Child(name){
    Parent.call(this,name)
    this.getChildName = function(){
        return 'childName'
    }
}

Child.prototype.sayChildName = function(){
    return 'sayChildName'
}

Child.prototype = new Parent('parent')

var child = new Child('child')

var parent = new Parent('parent')

Child.prototype.constructor = Child//重新改写构造函数为自身

console.log(parent.name,child.name)

console.log(parent.getName(),child.getName())

console.log(child.sayName())

console.log(child.constructor)

console.log(Child.prototype === child.__proto__)

var child2 = Object.create(Parent.prototype)

console.log(child2.constructor)

function createObj(sup){//Object.create
    function F(){}
    F.prototype = sup
    return new F()
}

var child3 = createObj(Parent.prototype)

console.log(child3.constructor,child3.sayName(),child3.__proto__)

function Child2(){
    Parent.call(this)
}

Child2.prototype = Parent.prototype;//只能获取原型上定义的属性和方法

var child4 = new Child2()

console.log(child4.name)//undefined

console.log(child4.sayHello(),child4.__proto__)


function inheritObj(sub,sup){//寄生组合式继承
    var proto = Object.create(sup.prototype)
    proto.constructor = sub
    sub.prototype = proto
}

function Child3(name){
    Parent.apply(this,arguments)
}
inheritObj(Child3,Parent)

var child5 = new Child3('child5')

console.log(child5.sayHello(),child5.name,child5.getName())


function Child4(

){
    Parent.call(this)
}

var child6 = Object.create(Parent.prototype)

console.log(child6.constructor)

child6.constructor = Child4

console.log(child6.constructor)

console.log(child6.__proto__)
console.log(child6.sayName(),child6.sayHello())

console.log(Parent.prototype.isPrototypeOf(child6))//确定原型和实例的关系

//

function Person(){
    this.name = 'person'
}

var Boy = Object.create(new Person())

console.log(Boy.name)


//log

function log(){
    var args = Array.prototype.slice.call(arguments)
    args.unshift('hi')
    console.log.apply(console,args)
}

log(1,2,3)
