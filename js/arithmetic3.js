/***js循环绑定事件****/
function xunhuan1(){
    for(let i = 0;i < 10;i++){
        console.log(i);
    }
}

xunhuan1();

function xunhuan2(){
    for(var i = 0;i < 10;i++){
        console.log(i);
    }
}

xunhuan2();
