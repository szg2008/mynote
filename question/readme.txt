1.一个div元素添加多个点击事件：
    div.onclick = fun1
    div.onclick = fun2

    fun2会覆盖fun1

    如果要两个方法都执行:
    div.onclick = function(){
        fun1();
        fun2();
    }

    or
    事件监听
    div.attachEvent("onclick", func1);
    div.attachEvent("onclick", func2)
    这样func1和func2都会被执行。

2.Tcp三次握手，四次挥手
    物理层、数据链路层、网络层(ip)、传输层(Tcp)、应用层(http)
    三次握手的本质需求：信道不可靠，数据传输要可靠，三次握手不是Tcp本身的要求，而是为了满足在不可靠的信道中需要传输可靠的数据
    三次握手大致过程：
        1.客户端向服务器端发送连接请求包，标志位SYN(同步序号)置为1，序号为x＝0

        ps:A发给B的SYN中途被丢，没有到达B，A会周期性超时重传，直到收到B的确认

        2.服务器端接收到客户端发送过来的报文，由SYN＝1知道客户端要求联机，向客户端发送一个SYN和ACK(确认包)都置为1的TCP报文，设置初始序号Y＝0，将确认序号设置为客户端的
        序号加1，即x+1=0+1=1

        ps:即B发给A的SYN +ACK 中途被丢，没有到达A，B会周期性超时重传，直到收到A的确认

        3.客户端收到服务端发送来的包后检查确认序号是否正确，即第一次发送的序号＋1(x+1),以及标志位ACK是否为1，如果正确，客户端再次发送确认包，ACK为1，
        SYN标志为0，确认序号y+1=0+1=1,发送序号为x+1=1，服务器端收到确认序号值和ack＝1，则建立连接，可以传输数据了

    四次挥手大致过程：
        在tcp连接握手时为何ACK是和SYN一起发送，这里ACK却没有和FIN一起发送呢。原因是因为tcp是全双工模式，接收到FIN时意味将没有数据再发来，
        但是还是可以继续发送数据

        1.主机A向主机B发送FIN包；A告诉B，我（A）发送给你（B）的数据大小是N，我发送完毕，请求断开A->B的连接
        2.主机B收到了A发送的FIN包，并向主机A发送ACK包；B回答A，是的，我总共收到了你发给我N大小的数据，A->B的连接关闭
        3.主机B向主机A发送FIN包；B告诉A，我（B）发送给你（A）的数据大小是M，我发送完毕，请求断开B->A的连接。
        4.主机A收到了B发送的FIN包，并向主机B发送ACK包；A回答B，是的，我收到了你发送给我的M大小的数据，B->A的连接关闭。

        四次挥手释放连接时，等待2MSL的意义？
            第 一，为了保证A发送的最后一个ACK报文段能够到达B。这个ACK报文段有可能丢失，因而使处在LAST-ACK状态的B收不到对已发送的FIN和ACK 报文段的确认。
            B会超时重传这个FIN和ACK报文段，而A就能在2MSL时间内收到这个重传的ACK+FIN报文段。接着A重传一次确认。
            第二，就是防止上面提到的已失效的连接请求报文段出现在本连接中，A在发送完最后一个ACK报文段后，再经过2MSL，就
            可以使本连接持续的时间内所产生的所有报文段都从网络中消失

        CLOSE_WAIT：
            发起TCP连接关闭的一方称为client，被动关闭的一方称为server。被动关闭的server收到FIN后，但未发出ACK的TCP状态是CLOSE_WAIT

        TIME_WAIT：
            发起socket主动关闭的一方 socket将进入TIME_WAIT状态。TIME_WAIT状态将持续2个MSL

3.js在IE8之前的兼容问题
    (1).event事件：
        document.onclick = function(ev){
            var e = ev || window.event;//兼容写法
            ev IE9以下不支持
        }

    (2).绑定事件addEventListener,attachEvent

    (3).Dom节点
    function nextnode(obj){//获取下一个兄弟节点，上一个兄弟节点，第一个节点，最后一个节点
        if (obj.nextElementSibling) {
          return obj.nextElementSibling;
        } else{
          return obj.nextSibling;
        };
    }

    (4).获取dom对象的方法querySeletor

    (5).获取非行间样式的元素的值
        function getStyle(object,oCss) {
           if (object.currentStyle) {
             return object.currentStyle[oCss];//IE
           }else{
             return getComputedStyle(object,null)[oCss];//除了IE
           }
        }

    (6).js阻止事件传播,阻止默认事件
        e.stopPropagation();//W3C标准
        e.cancelBubble = true;//IE

        e.preventDefault();//w3c
        e.returnValue = 'false'//IE

    (7).event事件中的target
        document.onmouseover = function(e){
            var e=e||window.event;
            var Target=e.target||e.srcElement;//获取target的兼容写法，后面的为IE
            var from=e.relatedTarget||e.fromElement;//鼠标来的地方，同样后面的为IE...
            var to=e.relatedTarget||e.toElement;//鼠标去的地方
        }

    (8).鼠标滚轮滚动事件
        //火狐中的滚轮事件
        document.addEventListener("DOMMouseScroll",function(event){
            alert(event.detail);
        },false)
        //非火狐中的滚轮事件
        document.onmousewheel=function(event){
            alert(event.detail);
        }

    (9).标签的自定义属性
        div => value
        非IE div.value
        通用div.getAttribute('value')

    (10).input type属性
        IE下type是只读，ff和chrome是可读可写的

    (11).innerText在ff下不支持，需用textContent代替

    (12).父级元素获取
        IE parentElement parentNode
        !IE parentNode

    (13).上传图片的大小
        !IE files[0]
        IE 获取图片的size
            var filePath = target.value;
            var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
            var file = fileSystem.GetFile (filePath);
            fileSize = file.Size;

    (14).上传图片的预览
        !IE FileReader
        IE Filter
            var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            file.blur();
            var src = document.selection.createRange().text;
            var img = document.getElementById('logoshow');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            div.innerHTML = "<img id=logoshow style='margin:0px auto;width:180px;height:180px;" + sFilter + src + "\"'>";

    (15).在IE中，一个元素的ID可以直接在document对象中当作变量使用
        非IE中，必须使用document.getElementById

    (16).获取float属性值
        IE：document.getElementById("header").style.styleFloat="left";
        ！IE：document.getElementById("header").style.cssFloat="left";

    (17).ff下获取键盘值的方法：event.which

    (18).XMLHttpRequest
        IE:new ActiveXObject('Microsoft.XMLHTTP')
        !IE:new XMLHttpRequest

    (19).img的src刷新问题
        <img id="pic" onclick= "this.src= 'a.jpg'"
        src="aa.jpg" style="cursor: pointer"/>
        ff下需要在onclick时添加一个随机数清除缓存

    (20).集合类对象问题：
        IE：可以使用() []获取集合类对象
        ！IE不支持()

    (21).setAttribute('style','color:red;')
        IE不支持
        不用setAttribute('style','color:red')
        而用object.style.cssText = ‘color:red;'

    (22).setAttribute设置事件
        obj.setAttribute('onclick','funcitonname();');
        IE不支持
        兼容IE
            obj.onclick=function(){fucntionname();};

    (23).<meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″ />
        页面头部添加meta标签的意思是兼容chrome和IE渲染页面，是一种兼容的处理方式


4.css在IE8之前的兼容问题
    (1).float浮动造成IE6下双倍边距问题,给IE6单独设置实际边距的一半
    (2).<!--[if IE 8 ]> <html class="ie8" lang="en"> <![endif]-->
        使用IE独有的文档注释的方式去区分IE的版本
    (3).<meta name="renderer" content="webkit">360绝大部分的兼容问题，使用webkit内核渲染页面
    (4).:first-child支持，:last-child不支持，前者是css2标准，后者是css3属性
    (5).opacity:0.2 IE下不支持，使用filter滤镜
    (6).IE6下的最小高度问题，使用 overflow:hidden
    (7).如果子元素设置相对定位，父级元素包不住子级元素，也就是不能出现滚动条
        解决办法是：给父级元素也添加相对定位属性
    (8).button中使用padding 设置左右边距，在IE下随着button文字越多，左右两边的边距会越来越大
        解决办法是：设置overflow:visible
    (9).IE下设置中z-index:auto也会产生层叠上下文，导致元素的上下层关系混乱
    (10).块元素包含块元素浮动，如果被包含的块元素设置高度，那么被包含的块元素会撑满一行，而不是随着父级元素一块浮动
        解决办法：给被包含的块元素也设置浮动

5.防止内存泄露的措施
    回收机制通常有2中实现方式：标记清除和引用计数
    (1).尽量避免过多的使用全局变量
    (2).没有清理的DOM元素的引用
    (3).定时器的存在
    (4).回调函数的引用
    (5).闭包的引用

6.事件委托、事件冒泡、事件源 onclick执行的时机
    一个完整的事件流是从window开始，最后又回到window的过程
    事件流分成3个阶段：捕获过程、目标过程、冒泡过程
    target和currentTarget：target是真正发生事件的元素(事件源)，currentTarget是当前事件发生在哪个Dom元素上
    目标元素上绑定的事件都是发生在目标阶段，先绑定的事件先发生。
    非目标元素遵循的是先发生捕获然后在冒泡的规则，如果使用onclick直接绑定该元素，那么绑定的事件是发生在了冒泡阶段
    事件绑定
        直接绑定：onclick
            没有浏览器兼容问题，this引用的是当前元素
            只是发生在冒泡阶段，一个元素一次只能处理一个函数，如果绑定多个函数，后面的将会覆盖前面的
        在元素里面使用事件属性:click
            浏览器兼容性：addEventListener attachEvent
            同时发生在捕获阶段和冒泡阶段，一次能绑定多个事件
                addEventListener:事件阶段取决于最后的参数：false冒泡，true捕获，可以为同一个元素同时绑定多个事件，事件之间相互独立，不会覆盖
                attachEvent:可以为同一个元素同时绑定多个事件，事件之间相互独立，不会覆盖,仅支持事件冒泡阶段，
                并且函数内部的this指向了window对象，事件名字必须是ontype的形式

    事件委托：
        如果页面上有很多事件处理程序，这样会影响页面整体的性能，这时候可以利用事件冒泡的机制来使用事件委托
        将多个事件的处理程序合并成一个
        好处就是提高页面性能，同时对于新添加进来的元素也不用重新绑定事件程序了

7.Node常用模块
    util:工具类模块
    fs:操作文件和操作目录
    path:规范化路径
    http:
    url:解析url
    querystring:用于实现URL参数字符串与参数对象的互相转换

8.请求方式get和post区别
    (1).get请求的数据会附加在url上，post会放置在请求包的包体中
    (2).get请求对url的长度是有限制的，
        post不会存在这个问题，但是服务器会对提交数据的大小做限制
    (3).get请求能够被缓存，post不能被缓存
    (4).post安全性比get高
    (5).根据http规范，get是用于信息获取，而且应该是安全的，post可能会更新服务器上的资源

9.项目中总结遇到的问题以及解决方案
    1.react实现后台小程序管理中，区域设置中title颜色选择之后，
        通过设置state值传递给父级组件，结果一个state将所有的区域的title都修改了，应该是一个state对应
        一个input，之前jq的方式是直接选择dom对应的，不会出现现在的问题，这里需要先将每个input设置成唯一
        解决办法是：给每一个input元素设置不同的id值，确保它的唯一性，id值的唯一性是通过初始化组件时，父级传递的唯一的layoutuuid
        即每个区域的id，保证了它的唯一性
    2.上传文件的组件input file，设置了上传的文件类型accept="image/*"，然后在谷歌浏览器上面反应3-5秒才弹出
    选择文件的对话框，改成accept="image/jpeg,image/gif,image/png"，上传图片文件就没有那个问题了，但是
    如果上传的类型是zip之类的，问题又出现了，原因是谷歌会自行检测文件的安全性，会连接海外服务器进行检测，这样导致了反应慢的问题，
    目前解决的办法是在谷歌浏览器中设置不检测这些文件就好了。开始以为是上传插件webuploader的问题
    3.图片懒加载失效，获取scrolltop的值不对，
        在新增需求时，每个列表添加了html结构，添加了样式，其中用到了postion:relative，导致计算出的scrolltop有问题
        对现有结构稍作修改，保证计算的值是正确的
    4.分享落地页面，点击打开，直接跳回app原生页面
        安卓scheme协议；
        ios跟系统有关系
            ios9以下：使用scheme协议
            ios9以上：universe 通用链接，服务器上面上传一个关于app信息的json文件，客户端需要配置相应的域名(安全)
    5.实现下拉刷新效果，通过改变height值实现高度的变化
    6.ios系统，h5页面使用iframe，内部的滚动条失效了。
        解决办法：
        把iframe中body里的内容全部包裹一层，然后设置包裹这一层的height，使用属性-webkit-overflow-scrolling:touch;overflow:auto;

10.extend拷贝
    默认情况下是浅拷贝，如果在使用的时候设置了true，那么将会是深拷贝
    浅复制会导致 obj.arr 和 shallowObj.arr 指向同一块内存地址
    深复制则不同，它不仅将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深复制的方法递归复制到新对象上。
    这就不会存在上面 obj 和 shallowObj 的 arr 属性指向同一个对象的问题。
    var object1 = {
        apple: 0,
        banana: {
            weight: 52,
            price: 100
        },
        cherry: 97
    };
    var object2 = {
        banana: {
            price: 200
        },
        durian: 100
    };

    //默认情况浅拷贝
    //object1--->{"apple":0,"banana":{"price":200},"cherry":97,"durian":100}

    //深拷贝
    //object1--->{"apple":0,"banana":{"weight":52,"price":200},"cherry":97,"durian":100}

11.ajax type:options

    返回服务器针对特定资源所支持的HTTP请求方法。
    也可以利用向Web服务器发送‘*‘的请求来测试服务器的性能

12.http协议
    在浏览器地址栏键入URL，按下回车之后会经历以下流程
    (1).浏览器向DNS服务器请求解析该URL中的域名对应的ip地址
    (2).解析出ip之后，根据ip地址和端口，和服务器建立Tcp连接
    (3).浏览器发出读取文件的http请求，将该数据发送给服务器
    (4).服务器对浏览器作出响应，并把对应的html文本返回给浏览器
    (5).释放tcp
    (6).浏览器解析文本并展示内容

    session的实现描述：服务器给每个session分配一个id，通过服务器返回给客户端，保存在cookie
    中，在客户端发起请求的时候，将这个id一起传送给服务器，服务器通过传递的id，找到对应的信息

    http协议定义的八种方法：
        GET、POST、PUT、DELETE、TRACE、HEAD、CONNECT、OPTIONS

13.DOM0级事件和DOM2级事件
    0级事件
        在标签内绑定onclick
        在js中写onclick = func
    2级事件
        addEventListener removeEventListener
        第一个参数是事件名（如click）；
　　　　　第二个参数是事件处理程序函数；
　　　　　第三个参数如果是true则表示在捕获阶段调用，为false表示在冒泡阶段调用。

/***
    1.作用域、闭包、this
    6.性能优化(视频教程)
    7.css布局、定位、浮动、层叠、行高、边框、css3动画、预编译(less sass stylus)
    8.原生dom操作

    2.es6语法
    3.react、redux
    4.vue、vuex
    5.canvas
    9.webpack原理、插件编写、loader编写
****/
