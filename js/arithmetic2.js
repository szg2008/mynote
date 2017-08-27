/***
实现函数 makeClosures，调用之后满足如下条件：
1、返回一个函数数组 result，长度与 arr 相同
2、运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同
***/
function makeClosures(arr,fn){
    var result = new Array;
    arr.forEach(function(item,index){
        result.push(
            function(){
                return fn(item);
            }
        );
    });
    return result;
}
//eg:makeClosures
var arr1 = [1,2,3];
var square = function(x){
    return x * x
}
var resarr = makeClosures(arr1,square);
//console.log(resarr[0](),resarr[1](),resarr[2]())

/**
实现函数 functionFunction，调用之后满足如下条件：
1、返回值为一个函数 f
2、调用返回的函数 f，返回值为按照调用顺序的参数拼接，拼接字符为英文逗号加一个空格，即 ', '
3、所有函数的参数数量为 1，且均为 String 类型

输入例子:
functionFunction('Hello')('world')
输出例子:
Hello, world

***/

const functionFunction = str => str1 => [str,str1].join(', ')

var res2 = functionFunction('Hello')('world')

//console.log(res2);


/***
将函数 fn 的执行上下文改为 obj 对象

输入例子:
speak(function () {return this.greeting + ', ' + this.name + '!!!';}, {greeting: 'Hello', name: 'Rebecca'})
输出例子:
Hello, Rebecca!!!
**/
let obj1 = {
    greeting:'Hello',
    name:'Rebecca'
}
function speak(fn,obj){
    return fn.call(obj);
}
function speaktest(){
    return this.greeting + ', ' + this.name + '!!!';
}
var res2 = speak(speaktest,obj1);

//console.log(res2)

/****
将数组 arr 中的元素作为调用函数 fn 的参数
输入例子:
argsAsArray(function (greeting, name, punctuation) {return greeting + ', ' + name + (punctuation || '!');}, ['Hello', 'Ellie', '!'])
输出例子:
Hello, Ellie!

***/
var arr3 = ['Hello', 'Ellie', '!'];
function argsAsArrayTest(greeting, name, punctuation){

    return greeting + ', ' + name + (punctuation || '!');
}
function argsAsArray(fn,arr){
    return fn.apply(null,arr);
}

var res3 = argsAsArray(argsAsArrayTest,arr3);

//console.log(res3)

/***
实现一个打点计时器，要求
1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1
2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作
3、第一个数需要立即输出
***/

function timerFun(start,end){
    console.log(start++)
    var timer = setInterval(function(){
        if(start <= end){
            console.log(start++)
        }else{
            clearInterval(timer);
        }
    },100);

    return {
        cancel:function(){
            clearInterval(timer);
        }
    }
}

//timerFun(2,3);


/***
    请修复给定的 js 代码中，函数定义存在的问题

    functions(true)  => a
***/
function functions(flag) {
    function getValue(){
        return flag ? 'a' : 'b';
    }
    return getValue();
}

//console.log(functions(true));


/**

在数组 arr 中，查找值与 item 相等的元素出现的所有位置

***/
function arrIndex(arr,value){
    var tempObj = [];
    arr.forEach((item,index)=>{
        if(item === value) tempObj.push(index)
    })

    return tempObj
}

function arrIndex2(arr,value){
    arr.map((item,index)=>item !== value ? -1 : index).filter((item,index)=>item !== -1)
}
var arr4 = arrIndex('qwesdfsdfksdfklj'.split(''),'s')
var arr5 = arrIndex('qwesdfsdfksdfklj'.split(''),'s')

//console.log(arr4,arr5)

/**

找出数组 arr 中重复出现过的元素
输入例子:
duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]).sort()
输出例子:
[1, 3, 4]

***/

function duplicates(duparr) {
    var tempArr = [];
    duparr.forEach(function(item,index) {
        tempArr[item] = (tempArr[item] === undefined ? 1 : tempArr[item] + 1);
        /* 计算每个元素出现次数 */
    });

    return tempArr.reduce(function(ret, e, item) {
        //console.log(ret,e,item)
        if (e && e !== 1 && ret.indexOf(item) === -1) {
            ret.push(item);
            /* 当元素存在，且出现次数不为1，且未push进ret中时... */
        }
        return ret;
    }, []);
}

var arr6 = duplicates([1,23,46,2,2,46]);

//console.log(arr6)

/***

合并数组 arr1 和数组 arr2。不要直接修改数组 arr，结果返回新的数组

***/
function concatArr(arr1,arr2){
    var tempObj = arr1.slice(0);
    [].push.apply(tempObj,arr2)
    return tempObj
}

//console.log(concatArr([1,3,8],[3,4,5]))


/*****

移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回

ps:如果不能直接修改数组，使用filter
*****/

function removeWithoutCopy(arr,value){
    for(let i = 0; i < arr.length;i++){
        if(arr[i] === value){
            arr.splice(i,1);
            i--;
        }
    }

    return arr;
}

var arr7 = removeWithoutCopy([1,3,4,5,6,3,3,4],3);
console.log(arr7)

/***
找出元素 item 在给定数组 arr 中的位置
输出描述:
如果数组中存在 item，则返回元素在数组中的位置，否则返回 -1
输入例子:
indexOf([ 1, 2, 3, 4 ], 3)
输出例子:
2
***/
function arrIndexOf(arr,item){
    var count = 0,len = arr.length;
    while(arr.length != 0 && arr[0] != item){
        arr.shift();
        count++;
    }
    return count == len ? -1 : count;
}

console.log(arrIndexOf([1,23,4,5,73,566],566))


/**统计一个字符串出现最多的字母**/
let string_str = 'abcabb';

function getStringChar(string_str){
    var obj = {};
    for(let i = 0;i < string_str.length;i++){
        var item = string_str[i];
        obj[item] = !obj[item] ? 1 : obj[item] + 1;
    }

    var maxValue = obj[string_str.charAt(0)];
    var str = string_str.charAt(0);
    for(let key in obj){
        if(maxValue < obj[key]){
            str = key;
        }
    }

    return str;

}

console.log(getStringChar(string_str));

/****不借助临时变量，实现两个整数的交换**/
function switchAB(a,b){
    b = b - a;
    a = a + b;
    b = a - b;

    return [a,b]
}

console.log(switchAB(4,5));//5,4


/**
    找出下列正数组的最大差值
    输入 [10,5,11,7,8,9]

    输出 6
***/
function maxCha(arr){
    var minPrice = arr[0];
    var maxProfile = 0;
    for(let i = 0; i < arr.length;i++){
        var currPrice = arr[i];
        minPrice = Math.min(minPrice,currPrice);
        var potentPrice = currPrice - minPrice;
        maxProfile = Math.max(maxProfile,potentPrice)
    }
    return maxProfile
}

console.log(maxCha([1,3,5,7,6,34,22,6,8]));


/***
    随机生成指定长度的字符串
****/

function getLenStr(len) {
    var str = 'abcdefghigklmnopqrstuvwxyz0123456789';
    var newstr = ''
    for(var i = 0;i < len;i++){
        newstr += str.charAt(Math.floor(Math.random() * str.length));
    }
    return newstr
}

console.log(getLenStr(12))

/***
    实现类似getElementsByClassName 的功能
****/

function queryClassName(node, name) {
  var starts = '(^|[\n\r\t\f])',
       ends = '([\n\r\t\f]|$)';
  var array = [],
        regex = new RegExp(starts + name + ends),
        elements = node.getElementsByTagName("*"),
        length = elements.length,
        i = 0,
        element;

    while (i < length) {
        element = elements[i];
        if (regex.test(element.className)) {
            array.push(element);
        }

        i += 1;
    }

    return array;
}

/****实现简单的二叉树****/


/***将一个数组顺序随机打乱****/

function randomSort(arr){
    return Math.random() > .5 ? -1 : 1
}

console.log([1,34,56,25,3,5].sort(randomSort));
