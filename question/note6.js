/*堆栈溢出**/
var list = readList()

var nextListItem = function(){
    var item = list.pop()

    if(item){
        //nextListItem()
        //add setTimeout
        setTimeout(nextListItem(),0)
        //当运行到这里的时候，由于使用的是异步，执行被推到了事件队列，堆栈清空，所以再次执行
        //nextListItem的时候，堆栈都是清空状态，不会频繁的调用堆栈，导致溢出了
    }
}

/**事件队列
***/

console.log(1)
setTimeout(function(){console.log(3)},0)
console.log(2)
//1 2 3 setTimeout被放在了事件队列

/***判断是NaN——》value !== value，判断自身是否相等***/
