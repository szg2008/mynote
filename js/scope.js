/**
作用域、闭包
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