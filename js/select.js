/**
选择日期/地区插件
**/
;(function($) {
    $.fn.province = function(options, Ycallback,Ncallback) {
        //插件默认选项
        var that = $(this);
        var docType = $(this).is('input');
        var provinceScroll = null,
            cityScroll = null;
        var indexY = 2;
        indexM = 2;
        var initY = 0,
            initM = 0;
        var initProvinceName = "北京";
        var liHeight = 80;
        var createScroll = true;
        $.fn.province.defaultOptions = {
            provinceCity: null,
            defaultCityName: '请选择',
            curRegion: false, //打开日期是否定位当前位置
            mode: null, //操作模式（滑动模式）
            event: "click", //打开日期插件默认方式为点击后后弹出日期 
            show: true
        };

        var dataDpr=$("html").attr("data-dpr");
        if (dataDpr==1) {
            liHeight=40;
        };

        //用户选项覆盖插件默认选项
        var opts = $.extend(true, {}, $.fn.province.defaultOptions, options);

        if (!opts.show) {
            that.unbind('click');
        } else {
            //绑定事件（默认事件为获取焦点）
            that.bind(opts.event, function() {
                resetInit();
                createUL(); //动态生成控件
                initScroll(); //初始化iscrll
                extendOptions(); //显示控件
                that.blur();
                refreshScroll();
                bindButton();
            });
        }

        function refreshScroll() {
            provinceScroll.refresh();
            cityScroll.refresh();
            provinceScroll.scrollToElement($(".wrapper li").eq(initY)[0], 500);
            cityScroll.scrollToElement($(".wrapperTwo  li").eq(initM)[0], 500);
            $(".wrapper ul li").eq(initY + 2).addClass('trans select');
            $(".wrapperTwo ul li").eq(initM + 2).addClass('trans select');
        }

        function resetIndex() {
            indexY = 2;
            indexM = 2;
        }

        //还原上次选择的值 
        function resetInit() {
            if(!$(that).data('area')){
                return;
            }
            var array = $(that).data('area').split('-');
            initProvinceName = array[0]; //todo判断
            initM = array[1]; //todo判断
            createScroll = false;
        }

        function bindButton() {
            resetIndex();
            $(".ok").unbind('click').click(function() {
                var provinceHtml = $(".wrapper ul li").eq(indexY).html();
                var cityHtml = $(".wrapperTwo ul li").eq(indexM).html();
                var str = provinceHtml + "-" + cityHtml;
                $(that).data('area',str);
                Ycallback($(".wrapperTwo ul li").eq(indexM).data('areaid'));
                $(".page").hide();
                $(".shadow").hide();
            });
            $(".cancle").click(function() {
                Ncallback();
                $(".page").hide();
                $(".shadow").hide();

            });
        }

        function extendOptions() {
            $(".page").show();
            $(".shadow").show();
        }
        //日期滑动
        function initScroll() {

            function createCityScroll(setSelect) {
                if (cityScroll) {
                    cityScroll.destroy();
                }
                cityScroll = new iScroll($(".wrapperTwo").get(0), {
                    snap: "li",
                    vScrollbar: false,
                    onScrollEnd: function() {
                        indexM = Math.ceil((this.y / liHeight) * (-1) + 2);
                        $(".wrapperTwo ul li").removeClass('select').removeClass('trans');
                        $(".wrapperTwo ul li").eq(indexM).addClass('trans select');
                    }

                });
                if (setSelect) {
                    $(".wrapperTwo ul li").eq(2).addClass('trans select');
                }
            }

            provinceScroll = new iScroll($(".wrapper").get(0), {
                snap: "li",
                vScrollbar: false,
                onScrollEnd: function() {
                    indexY = (this.y / liHeight) * (-1) + 2;
                    $(".wrapper ul li").removeClass('select').removeClass('trans');
                    $(".wrapper ul li").eq(indexY).addClass('trans').addClass('select');
                    if (!createScroll) {
                        createScroll = true;
                        return false;
                    }
                    $(".wrapperTwo ul").html(creatCity($(".wrapper ul li").eq(indexY).html()));
                    createCityScroll(true);
                }
            });

            createCityScroll();
        }

        function createUL() {
            CreateBaseUL();
            $(".wrapper ul").html(createProvince());
            $(".wrapperTwo ul").html(creatCity(initProvinceName));
        }

        function CreateBaseUL() {
            var str = '' +
                '<div class="shadow"></div>' +
                '<div class="page" >' +
                '<section>' +
                '<div class="title">' +
                '<ul>' +
                '<li class="licancle"><a class="cancle">取消</a></li>' +
                '<li class="liconfirm"><a class="ok">确定</a></li>' +
                '</ul>' +
                '</div>' +
                '<div class="mark"></div>' +
                '<div class="scroll">' +
                '<div class="wrapper">' +
                '<ul></ul>' +
                '</div>' +
                '<div class="wrapperTwo">' +
                '<ul></ul>' +
                '</div>' +
                '<div class="wrapperThree">' +
                '<ul></ul>' +
                '</div>' +
                '</div>' +
                '</section>' +
                '</div>';
            $("#slideChoose").html(str);
        }

        //创建 --年-- 列表
        function createProvince() {
            var str = "<li>&nbsp;</li><li>&nbsp;</li>";
            for (var i = 0, len = opts.provinceCity.length; i < len; i++) {
                str += '<li>' + opts.provinceCity[i].area_name + '</li>';
                if (opts.provinceCity[i].area_name == initProvinceName) {
                    initY = i;
                }
            }
            return str + "<li>&nbsp;</li><li>&nbsp;</li>";
        }

        function creatCity(provinceName) {
            indexM = 2; //改变省时候需要调整
            var str = "<li>&nbsp;</li><li>&nbsp;</li>";
            if (provinceName) {
                for (var i = 0, len = opts.provinceCity.length; i < len; i++) {
                    if (opts.provinceCity[i].area_name == provinceName) {
                        for (var j = 0, cityLen = opts.provinceCity[i].children.length; j < cityLen; j++) {
                            str += '<li data-areaid="'+opts.provinceCity[i].children[j].area_id+'">' + opts.provinceCity[i].children[j].area_name + '</li>';
                            if (opts.provinceCity[i].children[j].area_name == initM) {
                                initM = j;
                            }
                        }
                    }
                }
            } else {
                str += '<li>' + opts.defaultCityName + '</li>';
            }
            return str + "<li>&nbsp;</li><li>&nbsp;</li>";
        }
    };
})(Zepto);