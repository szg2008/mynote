//js实现继承
//1.冒充对象
function Parent1(username){
	this.username = username;
	this.hello = function(){
		console.log('this is hello function');
	}
}

Parent1.prototype.test = function(){
	console.log('this is parent1 function');
}

function Child1(username,addr){
	this.method = Parent1;
	this.method(username);
	//console.log(this.method)
	delete this.method;
	this.addr = addr;
	this.world = function(){
		console.log('this is world function');
	}
}
var parent1 = new Parent1('parname');
var child1 = new Child1('chiname','bj');
// parent1.hello();
// child1.hello();
// child1.world();
//child1.test();//不存在
//2.call apply方式
function Parent2(username){
	this.username = username;
	this.hello = function(){
		console.log('this is hello function');
	}
}
Parent2.prototype.test = function(){
	console.log('this is test function');
}
function Child2(username,addr){
	Parent2.call(this,username);//将this绑定到Parent2上
	// Parent2.apply(this,arguments);
	this.addr = addr;
	this.world = function(){
		console.log('this is world function');
	}
}
var parent2 = new Parent2('parname');
var child2 = new Child2('chiname','bj');
parent2.hello();
child2.hello();
child2.world();
//child2.test();//这个方法不存在,使用call/apply不能调用父类上使用prototype定义的属性和方法

//3.原型链继承
function Parent3(username){
	this.username = username;

	this.hello = function(){
		console.log('this is hello function');
	}
}
// Parent3.prototype.username = '222';

function Child3(username,addr){
	this.addr = addr;
	this.world = function(){
		console.log('this is world function');
	}
}
Child3.prototype = new Parent3('parname');//将Parent3中将所有通过prototype追加的属性和方法都追加到Child3，从而实现了继承
var child3 = new Child3('chiname3','bj');
console.log(child3.username);//parname3
child3.hello();

//4.混合继承
//使用call/apply和原型链混用的方式

//5.使用es6中的extends继承
