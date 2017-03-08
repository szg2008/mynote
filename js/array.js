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
		//console.log(this);
		arr[i] = callback.call(null,this[i],i);
	}
	return arr;
}

var roots2 = numbers.map2(function(x){
	return 9 + x;
});
console.log(roots2);//[10,12,14]

















