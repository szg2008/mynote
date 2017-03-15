/***数组排重****/
/***
	1.
		(1)构建一个新的数组存放结果
		(2)for循环每次从数组中取出一个元素，用这个元素和结果数组循环进行比较
		(3)如果数组中没有该元素，那么将该元素放在结果数组中
		(4)循环结束之后，返回这个新的数组
**/
Array.prototype.unique1 = function(){
	var res = new Array;
	var Dthis = this;
	for(var i = 0,len=Dthis.length;i < len;i++){
		var flag = false;
		for(var j = 0;j < res.length;j++){
			if(Dthis[i] == res[j]){
				flag = true;
			}
		}
		if(!flag){
			res.push(Dthis[i]);
		}
	}
	return res;
};
var arr1 = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0];
console.log(arr1.unique1());//[ 1, 'a', 'b', 'd', 'e', 0 ]

/*****
	2.
		(1)首先将原数组进行排序
		(2)检查原数组中的第i个元素和新数组中的最后一个元素是否相等，已经排序的数组中相等的元素是相邻的
		(3)如果不相同，那么将该元素加入到新的数组中
*****/
Array.prototype.unique2 = function(){
	var res = [];
	var Dthis = this;
	Dthis.sort();//排序
	for(var i = 0;i < Dthis.length;i++){
		if(!!res.length){
			if(Dthis[i] != res[res.length-1]){
				res.push(Dthis[i]);
			}
		}else{
			res.push(Dthis[i]);
		}
	}
	return res;
}
var arr2 = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0];
console.log(arr2.unique2());//[ 0, 1, 'a', 'b', 'd', 'e' ]

/**
	3.
		(1)创建一个空的数组存放结果
		(2)创建一个空的对象
		(3)for循环时，每次取出一个元素，判断对应对象中以该元素为键值的值是否存在，如果不存在，那么把它放在数组中，并把该元素对应的值赋值为1
***/
Array.prototype.unique3 = function(){
	var Dthis = this;
	var json = {};
	var res = [];
	for(var i = 0;i < Dthis.length;i++){
		if(!json[Dthis[i]]){
			res.push(Dthis[i]);
			json[Dthis[i]] = true;
		}
	}
	return res;
}
var arr3 = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0];
console.log(arr3.unique3());//[ 1, 'a', 'b', 'd', 'e', 0 ]

/***
	4.使用es6中的Set对象
**/
var arr4 = [1, 'a', 'a', 'b', 'd', 'e', 'e', '1', 0];
var set = new Set(arr4);
console.log([...set]);//[ 1, 'a', 'b', 'd', 'e', 0 ]

/**
	5.获取数组中没有重复数据的下标最大的元素放入新的数组
**/
Array.prototype.unique5 = function(){
	var Dthis = this;
	var res = [];
	for(var i = 0;i < Dthis.length;i++){
		var flag = false;
		for(var j = i + 1;j < Dthis.length;j++){
			if(Dthis[i] == Dthis[j]){
				flag = true;
			}
		}
		if(!flag){
			res.push(Dthis[i]);
		}
	}
	return res;
}
var arr5 = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0];
console.log(arr5.unique5());//[ 'a', 'b', 'd', 'e', 1, 0 ]
