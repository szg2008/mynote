/**
Array方法实现

**/

//Array.forEach
Array.prototype.forEach1 = function(callback,thisArg){
	var T,k;
	//console.log(this);//实例对象
	if(this == null){
		throw new TypeError('this is null or not defined');
	}
	var o = Object(this);
	//console.log(o);
	var len = o.length >>> 0;//保证返回的是正确的数组长度
	if({}.toString.call(callback) != "[object Function]"){
		throw new TypeError(callback + " is not a function");
	}
	console.log(thisArg);
	if(thisArg){
		T = thisArg;
	}
	console.log(T);
	k = 0;
	while(k < len){
		var kValue;
		if(k in o){
			kValue = o[k];
			callback.call(T,kValue,k,o);
		}
		k++;
	}
}

Array.prototype.forEach2 = function(callback){
	var len = this.length >>> 0;
	for(var i = 0;i < len;i++){
		callback.call(null,this[i],i);
	}
}

var arr1 = [2,56,4,1,4];
var arr2 = ['h','e','l','l','o'];
arr1.forEach1(function(item,index,arr){
	console.log(item);
	//console.log(arr);
});

arr2.forEach2(function(item,value){
	console.log(item);
});


//Array.map
if(!!Array.prototype.map){
	Array.prototype.map = function(callback,thisArg){
		var T,A,k;
		if(this === null){
			throw new TypeError('this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if(typeof callback !== 'function'){
			throw new TypeError(callback + ' is not function');
		}
		if (arguments.length > 1) {
      		T = arguments[1];
    	}
    	A = new Array(len);
    	k = 0;
    	while(k < len){
    		var kValue,mappedValue;
    		if(k in O){
    			kValue = O[k];
    			mappedValue = callback.call(T, kValue, k, O);
    			A[k] = mappedValue;
    			// console.log(T,kValue,k);
    			// console.log(mappedValue);
    		}
    		k++;
    	}
    	return A;
	}
}

var numbers = [1,3,5];
var roots = numbers.map(function(x){
	return 2 * x;
});
console.log(numbers,roots);//[ 1, 3, 5 ] [ 2, 6, 10 ]

Array.prototype.map2 = function(callback){
	var len = this.length >>> 0;
	var arr = new Array(len);
	for(var i = 0; i < len;	i++){
		// console.log(callback);
		arr[i] = callback.call(null,this[i],i);
		//这里返回一个i值，导致parseInt的第二个参数的进制数成为了0 1 2，所以后两个会输出NaN
	}
	return arr;
}

var roots2 = numbers.map2(function(x){
	return (9 + x);
});
console.log(roots2);//[10,12,14]

var roots3 = numbers.map2(parseInt);
console.log(roots3);//[1,NaN,NaN]

var roots4 = numbers.map2(Number);
console.log(roots4);//[1,3,5]

//Array.filter
var filArr = [3,5,34,98,123,223];
var newFilArr = filArr.filter(function(value){
	return value >= 100;
});
console.log(newFilArr);//[123,223]

Array.prototype.filter2 = function(callback,thisArg){
	var thisArg;
	var res = new Array();
	if(this == null){
		throw new TypeError();
	}
	var t = Object(this);
	var len = t.length >>> 0;
	if(typeof callback !== 'function'){
		throw new TypeError();
	}
	if(arguments.length >= 2){
		thisArg = arguments[1];
	}else{
		thisArg = void 0;
	}
	for(var i = 0;i < len;i++){
		if(i in t){
			if(callback.call(thisArg,t[i],i,t)){
				res.push(t[i]);
			}
		}
	}
	return res;
}
var newFilArr2 = filArr.filter2(function(value){
	return value < 50;
});
console.log(newFilArr2);//[3,5,34]

var everyArr = [23,45,67,2,33,15];
var everyFlag = everyArr.every(function(item,index){
	return item >= 20;
});
console.log(everyFlag);//false

Array.prototype.every2 = function(callback,thisArgs){
	if(this == null){
		throw new TypeError('this is null or undefined');
	}
	var T = Object(this);
	var len = T.length >>> 0;
	var flag = true;
	for(var i = 0;i < len;i++){
		if(!callback.call(thisArgs,this[i],i,T)){
			flag = false;
			break;
		}
	}
	return flag;
}
var everyFlag2 = everyArr.every2(function(item,index){
	return item >= 0;
});
console.log(everyFlag2);//true

//Array.some:实现方法和every的判断条件不同而已
Array.prototype.some2 = function(callback,thisArgs){
	if(this == null){
		throw new TypeError('this is null or undefined');
	}
	var T = Object(this);
	var len = T.length >>> 0;
	var flag = false;
	for(var i = 0;i < len;i++){
		if(callback.call(thisArgs,this[i],i,T)){
			flag = true;
			break;
		}
	}
	return flag;
}

//Array.isArray
Array.prototype.isArray2 = function(arg){
	return Object.prototype.toString.call(arg) === '[object Array]';
}

//Array.reduce
var reduceArr = [1,3,5];
var sum = reduceArr.reduce(function(a,b){
	console.log(a,b);
	return a + b;
},0);
console.log(sum);//9
var reduceArr2 = [[1,4],[3,7],[5,9]];
var sum2 = reduceArr2.reduce(function(a,b){
	console.log(a,b);
	return a.concat(b);
},[]);
console.log(sum2);//[1,4,3,7,5,9]
var reduceArr3 = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}];
var sum3 = reduceArr3.reduce(function(prev, curr) {
  return (prev + ',' +curr.books.join(',')).split(',');
}, ['Alphabet']);
console.log(sum3);

Array.prototype.reduce2 = function(callback,initialValue){
	if (this === null) {
        throw new TypeError( 'Array.prototype.reduce ' + 'called on null or undefined' );
    }
    if (typeof callback !== 'function') {
        throw new TypeError( callback + ' is not a function');
    }
    var o = Object(this);
    var len = o.length >>> 0;     
    var k = 0; 
    var value;
    if (arguments.length == 2) {
        value = arguments[1];
    } else {
	    while (k < len && !(k in o)) {
	      	k++; 
	    }
	    if (k >= len) {
	      throw new TypeError( 'Reduce of empty array ' +
	        'with no initial value' );
	    }
	    value = o[k++];
  	}
  	while (k < len) {
	    if (k in o){
	      	value = callback(value, o[k], k, o);
	    }
    	k++;
  	}
  	return value;
}
var sum4 = reduceArr3.reduce2(function(prev, curr) {
  return (prev + ',' +curr.books.join(',')).split(',');
}, ['Alphabet']);
console.log(sum4);
//Array.reduceRight和reduce正好相反，是从数组的最后开始遍历
















