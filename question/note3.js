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
        f = function f(){return false}

    }
})();

console.log(f())

/***
bind
类似与call apply方法
    改变函数体执行时候的上下文this
    科里化

***/

function add(a,b,c){
    return a + b + c
}

var func = add.bind(null,100)

console.log(func(1,2))//100+1+2

var func2 = func.bind(undefined,200)

console.log(func2(3))//100+200+3





/**
多列布局
box-sizing
**/

/***变量提升的原因

函数初始化阶段：
    1.函数参数进行初始化
    2.函数声明(如果命名发生冲突，会发生覆盖)
    3.变量声明(初始化变量为undefined，如果发生命名冲突，会忽略)
**/
