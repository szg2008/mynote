/***js循环绑定事件****/
function xunhuan1(){
    var ul = document.getElementById('ul');
    for(var i = 0;i < 10;i++){
        var li = document.createElement('li');
        li.innerHTML = i + 1;
        (function(i){
            li.onclick = function(){
                console.log(i+1);
            }
        })(i);
        ul.appendChild(li);
    }
}

function xunhuan2(){
    var ul = document.getElementById('ul');
    for(let i = 0;i < 10;i++){//使用let产生块级作用域
        var li = document.createElement('li');
        li.innerHTML = i + 1;
        li.onclick = function(){
            console.log(i+1);
        }
        ul.appendChild(li);
    }
}

function xunhuan3(){
    var ul = document.getElementById('ul');
    for(var i = 0;i < 10;i++){
        var li = document.createElement('li');
        li.innerHTML = i + 1;
        li.i = i + 1;
        li.onclick = function(){
            console.log(this.i);
        }
        ul.appendChild(li);
    }
}
