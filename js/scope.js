/**
作用域
**/
var scope1 = 'a';
function fun1(){
	console.log(scope1);
	var scope1 = 'b';
}
fun1();//undefined   变量声明提升

var scope2 = 'c';
function fun2(){
	console.log(scope2);
}
var scope2;
fun2();//c  如果同一个变量声明两次，一个赋值，一个没有初始化，那么变量的值为初始化的值

function fun3(){
	console.log(scope3);
	scope3 = 'd';
}
var scope3;
fun3();//undefined  如果注释掉var scope3;那么会报错，因为scope3本身没有声明

function fun4(){
	scope4 = 'e';
	console.log(scope4);
	//var scope4;同样都会输出e
}
fun4();//e


/**
闭包:
	一个函数在它所在的词法作用域之外执行了，就产生了闭包
	常见的闭包的例子就是各种回调函数：计时器、绑定事件、ajax请求
***/

//eg1
function wrap1(){
	var a = 12;
	function inner1(){
		console.log(a);
	}
	return inner1;
}
wrap1()();//inner1在它所在的词法作用域之外执行了，当wrap1执行之后，并不能将其放入垃圾回收站，因为inner1还有对他的引用，这个引用就形成了闭包
//eg2
var fn2;
function wrap2(){
	var b = 3;
	function inner2(){
		console.log(b+' inner2');
	}
	fn2 = inner2;
}
function tmp(){
	fn2();
}
wrap2();
tmp();//3 inner2

//eg3
for(var i = 1;i <= 5;i++){
	//作用域是共享的，所以i也是共享的
	setTimeout(function timer(){
		console.log(i);//6 6 6 6 6
	},i*1000);
}
for(var j = 1;j <= 5;j++){
	(function(j){
		//setTimeout(function timer(){
			console.log(j);//1 2 3 4 5
		//},j*1000);
	})(j);
}
//另外es6中的let可以创建块级作用域
