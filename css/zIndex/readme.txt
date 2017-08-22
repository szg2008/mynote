1.不考虑css3,z-index只在定位元素上面有效

2.七阶层叠水平(从下到上)：
    层叠上下文background/border
    负z－index
    block块状水平盒子
    float浮动盒子
    inline/inline-block水平盒子
    z-index:auto或者z-index:0,不依赖z-index的层叠上下文
    正z-index

3.z-index不为auto的定位元素会创建层叠上下文

4.z-index:auto在IE7浏览器下也会创建层叠上下文

5.z-index层叠表现是受制于层叠上下文的：[
    .box1{z-index:0}
    .box1 img{z-index:9999}
    .box2{z-index:1}
    .box img{z-index:-1}
]，表现的是box2下面的图片在box1下面的图片的上面

6.其他参与层叠上下文的属性：(在七阶层叠水平中属于“z-index:auto或者z-index:0”水平)
    z-index不为auto的flex项
    opacity不是1的元素
    元素的transform不是none
    元素的mix-blend-mode的值不是normal
    元素的filter不是none
    元素的isolation的值是isolate
    position:fixed声明
    元素的-webkit-overflow-scrolling设置成touch

7.通过z-index创建层叠上下文的元素
    定位元素
    display:flex下面的flex项子元素
