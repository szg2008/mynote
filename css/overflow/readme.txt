1.td元素，设置尺寸、overflow不起作用，需要给table设置table-layout:fixed

2.IE7，button文字越多，两边空白越大，需要设置overflow:visible

3.无论什么浏览器，滚动条的出现是来自于html，而不是body，所以设置overflow:hidden时，只设置html即可

4.获取滚动高度代码，兼容性：
    chrome：document.body.scrollTop
    其他：document.documentElement.scrollTop

5.overflow的padding-bottom缺失(chrome除外)，导致scrollHeight计算的错误

6.水平居中跳动问题：
    html{overflow:scroll}
    .container{padding-left:calc(100vw-100%)}->100%可用内容宽度

7.webkit自定义滚动条->scrollbar
    ::-webkit-scrollbar{width:8px;height:8px}/*血槽宽度*/
    ::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0.3)}/*拖动条**/
    ::-webkit-scrollbar-track{background-color:#ddd;border-radius:6px}/**背景槽**/

8.ios原生滚动回调效果：-webkit-overflow-scrolling:touch

9.清除浮动：
    .clearfix{overflow:hidden;_zoom:1}
    .clearfix:{*zoom:1} .clearfix:after{content:"";display:table;clear:both}

10.设置了overflow的元素(visible除外)，里面有什么清除浮动之类的，都不会有什么变化

11.overflow:hidden失效：设置了绝对定位的元素剪裁效果失效
    避免的方法：overflow自身为包含块(设置定位属性)
                子元素设置包含块

12.overflow滚动失效：设置了绝对定位的元素滚动效果失效
    避免的方法：overflow自身为包含块(设置定位属性)
                子元素设置包含块
13.锚点链接，锚点定位,本质是改变滚动高度
