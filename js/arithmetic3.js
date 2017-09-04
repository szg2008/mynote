/**字符串扩展，
'Hello'.repeatStr(3)->HelloHelloHello
**/
String.prototype.repeatStr = function(n){
    let str = '';
    for(let i = 0;i < n;i++){
        str += this;
    }
    console.log(str)
}
'Hello'.repeatStr(3);//HelloHelloHello
