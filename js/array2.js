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
















