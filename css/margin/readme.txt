1.普通元素的margin百分比都是相对于容器的宽度计算的(自适应矩形)
2.绝对定位的元素的margin百分比是相对于第一个定位祖先元素(relative,fixed,absolute)的宽度计算的
3.margin重叠只发生在block元素上,且垂直方向的,重叠的情况：
    相邻元素之间
    父子之间
    空的block元素
4.margin auto 分配剩余空间使用

5.margin垂直方向居中:
    writing-mode:vertical-lr
    使用绝对定位，填满父容器:[
        .box3{
            width:400px;
            height: 200px;
            position: relative;
        }
        .box3 .text{
            position: absolute;
            left:0;
            top:0;
            bottom:0;
            right:0;
            height: 100px;
            width:200px;
            margin:auto;
            background-color: #69e;
        }
    ]
6.margin两端对齐：使用margin负值

7.margin两端等高布局：先使用margin-bottom设置一个负值，改变元素占据的空间，然后使用padding-bottom将占据的空间补充回来

8.两栏自适应效果：margin负值实现:[
    .box4 .text{
        float:left;
        width:70%;
    }
    .box4 .text .inner{
        margin-right:100px;
    }
    .box4 img{
        float: left;
        margin-left: -100px;
    }
]

9.margin无效情形:
    绝对定位的元素看似没有效果(一直有效)，原因是绝对定位元素脱离文档流，跟相邻元素没有任何关系
    使用浮动实现的自适应两栏布局(左图右边文字)，右边设置margin值，它是相对于父级元素的左边的，数值大的时候才能看出效果
    {
        <p>
            <img src='url'/>
        </p>
    },
    当设置img的margin-top值的时候，图片会移动，
    但是到一定值的时候就不会跟随设置的值移动了，原因是内联元素默认的对齐方式是基线对齐，基线不可能跑到容器外面。


10.inline元素，padding不影响垂直方向,但是影响背景色

11.ff浏览器下button两边的padding：[
    padding:0;有问题
    button:-moz-focus-inner{padding:0}
]

12 IE7 button文字越多，两边的padding越大：[
    button:{overflow:visible;}
]

13.配合margin实现等高布局
