/*
    1.请编写一个JavaScript 函数toRGB，它的作用是转换CSS中常用的颜色编码
    使用parseInt
**/
function toRGB(color){
    let result = []
    let reg = /^#[0-9a-zA-Z]{3}$/
    if(color === 'invalid') return 'invalid'
    if(reg.test(color)) return color
    else{
        for(let i = 1; i <= 6;i+=2){
            let str = color.substr(i,2)
            result.push(parseInt(str,16));
        }
        return result;
    }
}

console.log(toRGB('#e4e3ff'));

/**
2.
***/

var Obj = function(msg){
    this.msg = msg;
    this.shout = function(){
        console.log(this.msg);
    }
    this.waitAndShout = function(){
        //隔五秒钟后执行上面的shout方法
        setTimeout(function () {
            var self=this;
            return function() {
                self.shout();
            }
        }.call(this),50);
    }
}
let obj = new Obj('Hi');
obj.waitAndShout();


/**
3.验证电子邮箱地址的格式
*/
function regEmail(email){
    let reg = /^\w+([\.-_]?\w+)@\w+([\.-_]?\w+)(\.\w{2,3})+$/;
    if(reg.test(email)){
        return true
    }else{
        return false
    }
}

console.log(regEmail('8_923__4987@qq.com.cn'));

/******
    trim()
****/
String.prototype.trim = function(){
    return this.replace(/^\s*|\s*$/g,'')
}
console.log('    jjs   '.trim());

/**
    实现一共返回1-5五个值，并且1秒钟输出一个
***/
for(var i=1;i<=5;i++) {
    (function(i){
        setTimeout(()=>{
            console.log(i)
        },i*1000)
    })(i);
}

/***

**/
'use strict'
f = function(){return true;}
g = function(){return false;}
;(function(){
    function g(){return true}
    if(g() && [] == ![]){
        f = function(){return false}

    }
})();

console.log(f())


/***

***/
function Parent(name,age){
    this.test = function(){
        console.log('test')
    }
}
function Child(){}

Child.prototype = Parent.prototype;//共享原型

Child.prototype.getName = function(){
    console.log('name')
}

Parent.prototype.getAge = function(){
    console.log('age')
}

var subParent = Object.create(Parent);

console.log(subParent)

//var subparent = new subParent();

subParent.test();

var parent = new Parent('123','456')

parent.getName()

//Child.prototype = new Parent('123','456');


/***
bind
***/


/**
多列布局
box-sizing
**/

/***变量提升的原因**/
