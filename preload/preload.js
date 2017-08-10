/**

图片预加载(无序加载,有序加载)

*/
;(function($){
    function PreLoad(imgs,options){
        this.imgs = typeof imgs === 'string' ? [imgs] : imgs;
        this.opts = $.extend({},PreLoad.DEFAULTS,options);
        if(this.opts.order == 'ordered'){
            this._ordered();
        }else{
            this._unordered();
        }
    }
    PreLoad.DEFAULTS = {
        order:'unordered',
        each:null,//每张图片加载完成之后执行
        all:null//所有图片加载完成之后执行
    }
    //有序加载
    PreLoad.prototype._ordered = function(){
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        load();
        function load() {
            var img = new Image();
            $(img).on('load error',function(){
                opts.each && opts.each(count);
                if(count >= len){
                    //所有图片加载完毕
                    opts.all && opts.all();
                }else{
                    load();
                }
                count++;
            });
            img.src = imgs[count];
        }
    }
    //无序加载
    PreLoad.prototype._unordered = function(){
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        $.each(imgs,function(index,src){
            if(typeof src != 'string'){
                return;
            }
            var img = new Image();
            $(img).on('load error',function(){
                opts.each && opts.each(count);
                if(count >= len - 1){
                    opts.all && opts.all();
                }
                count++;
            });
            img.src = src;
        });
    }
    $.extend({
        preload:function(imgs,opts){
            new PreLoad(imgs,opts);
        }
    });
})(jQuery);
