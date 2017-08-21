1.Ie7浏览器下不支持小数点的line-height
2.vertical-align起作用的前提：
    应用于inline(inline-block)和table－cell(作用于自身)元素(图片、按钮、文字和单元格),给元素设置float、position:absolute,vertical-align依然不起作用
3.vertical-align与line-height
    vertical-align的百分比是相对于line-height计算的
    3.2

4.实现图片大小不固定的垂直居中，设置vertical-align:middle;font-size:0

5.消除图片底部间隙的方法
    设置img:{display:block},因为vertical-align只对内联元素起作用
    img:{vertical-align:bottom},设置图片对齐方式
    设置父级元素行高line-height:0,消除文字底部的间隙

6.line-height实际应用：
        图片水平垂直居中:[IE8+
            .box{line-height:300px;text-align:center;font-size:0;}
            .box img{vertical-align:middle;}
        ]
        多行文字垂直居中:[IE8+
            .box{line-height:300px;text-align:center;}
            .box > .text{
                display:inline-block;line-height:normal;text-align:left;vertical-align:middle;
            }
        ]
