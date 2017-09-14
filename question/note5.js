/**
    websocket pwd
**/

客户端和服务器端通信的手段。

/**
    自定义事件
**/

var btn = document.querySelector('.button');
var ev = new Event('test',{
    bubbles:'true',
    cancelable:'true'
});

btn.addEventListener('test',function(event){
    console.log(event)
},false);

btn.addEventListener('click',function(event){
    btn.dispatchEvent(ev);
},false);

/***
    跨域：搜索历史记录的跨域访问
**/

/**
跨站请求攻击 CSRF
**/
CSRF攻击是源于WEB的隐式身份验证机制!
WEB的身份验证机制虽然可以保证一个请求是来自于某个用户的浏览器，但却无法保证该请求是用户批准发送的!


/***
Array
String
Object
*/
