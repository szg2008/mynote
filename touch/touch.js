/**
	Touch:仅仅限于最多两指操作
		移动	translate
		缩放	scale
		旋转	rotate

***/
var Touch = function(opt){
	this.container = opt.container || 'container';
	this.touch = false;
	this.mutitouch = false;
	this.mX = 0;
	this.mY = 0;
	this.scale = 1;
	this.rotation = 0;
	this.initAngle = 360;
	this.vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
  		(/firefox/i).test(navigator.userAgent) ? 'Moz' :
  		'opera' in window ? 'O' : '';
  	this.has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
  	this.hasTouch = 'ontouchstart' in window;
  	this.hasTransform = this.vendor + 'Transform' in document.documentElement.style;
	this.init();
};

Touch.prototype = {

	init:function(){
		var Dthis = this;
		var container = this.container;
		addEvent(get(container),'touchstart',function(e){
			Dthis.touchStart(e);
		});
		addEvent(get(container),'touchmove',function(e){
			Dthis.touchMove(e);
		});
		addEvent(get(container),'touchend',function(e){
			Dthis.touchEnd(e);
		});
	},
	touchStart:function(e){
		var point = e.touches[0];
		this.touch = true;
		this.startX = point.pageX;
		this.startY = point.pageY;
	},
	touchMove:function(e){
		e.preventDefault();
		var point = e.touches[0];
		if(this.touch){
			this.setPointData(point);
			this.mutiTouchDetect(e);
		}
		this.startX = point.pageX;
		this.startY = point.pageY;
		if(this.angle < this.initAngle){
			e.preventDefault();//阻止旋转时的默认事件
		}
		if(this.hasTouch && this.has3d && this.hasTransform){
			if(this.mutiTouch){
				get(this.container).style.webkitTransform = 'translate('+this.mX+'px,'+this.mY+'px) scale('+(this.scale)+') rotate('+this.rotation+'deg)';
            }else{
                if(this.scale==0 && this.rotation==0){
                	get(this.container).style.webkitTransform = 'translate('+(this.mX)+'px,'+(this.mY)+'px)';
                }else{
                	get(this.container).style.webkitTransform = 'translate('+this.mX+'px,'+this.mY+'px) scale('+(this.scale)+') rotate('+this.rotation+'deg)';
                }
            }
		}
	},
	touchEnd:function(e){
		var point = e.touches[0];
		this.touch = false;
		this.mutitouch = false;
	},
	setPointData:function(point){
		this.mX += point.pageX - this.startX;
		this.mY += point.pageY - this.startY;
		this.angle = this.getAngle(this.mY/this.mx);

	},
	mutiTouchDetect:function(e){
		this.tlen = e.touches.length;
		if(this.tlen == 2){
			var point0 = e.touches[0],
				point1 = e.touches[1],
				xlen = point1.pageX - point0.pageX,//两根手指滑动时改变的x距离
				ylen = point1.pageY - point0.pageY,//两根手指滑动时改变的y距离
				gis = this.getDis(xlen,ylen),
				angle = this.getAngle(ylen/xlen);
			if(!this.mutitouch){
				this.getStartDis = gis;
				this.getStartAngle = angle;
			}else{
				this.getEndDis = gis;
				this.scale *= gis/this.getStartDis;
				this.getStartDis = gis;
				this.getEndAngle = angle;
				this.rotation += angle - this.getStartAngle;
				this.getStartAngle = angle;
			}
			this.mutitouch = true;
		}else{
			this.mutitouch = false;
		}
	},
	getDis:function(x,y){
		return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	},
	getAngle:function(n){
		return Math.atan(n) * 180 / Math.PI;
	}
}

var addEvent = function(dom,type,fun){
	var tarr = type.split(',');
	for(var i = 0;i < tarr.length;i++){
		dom.addEventListener(tarr[i],fun);
	}
}

var get = function(str){
	return document.querySelector(str);
}
