/***
name:angular.pagination.js
author:suzigang
date:2016-06-07
version:1.0
use:<pagination conf="paginationConf"></pagination>
**/
angular.module('ng.pagination',[]).directive('pagination', [function () {
	return {
		restrict: 'EA',
		template:'<nav><ul class="pagination" ng-show="conf.totalItems > 0">'+
                        '<li ng-class="{disabled:conf.currentPage == 1}" >'+
                            '<a href="javascript:void(0);" ng-click="prevPage();"><span>上一页</span></a>'+
                        '</li>'+
                        '<li ng-repeat="item in pageList" ng-class="{active:item == conf.currentPage}"><a href="javascript:void(0);" ng-click="changeCurrentPage(item)">{{item}}</a></li>'+
                        '<li ng-class="{disabled:conf.currentPage == conf.numberOfPages}">'+
                            '<a href="javascript:void(0);" ng-click="nextPage();"><span>下一页</span></a>'+
                        '</li>'+
                        '<span style="margin-left:20px;">共<em style="color:#5f9c25;">{{conf.numberOfPages}}</em>页</span><span style="margin-left:10px;">到第<input type="text" class="form-control" name="page" ng-model="jumpPageNum" >页</span><button class="plat_button" type="button" ng-click="jumpToPage($event)">确定</button>'+
                '</ul></nav>',
		replace:true,
		scope:{
			conf:'='
		},
		link: function (scope, element, attrs) {

			// 变更当前页
            scope.changeCurrentPage = function(item){
                scope.conf.currentPage = item;
                scope.conf.onChange(scope.conf.currentPage);
            };

            // 定义分页的长度
            scope.conf.pagesLength = parseInt(scope.conf.pagesLength) ? parseInt(scope.conf.pagesLength) : 5 ;
            if(scope.conf.pagesLength % 2 === 0){
                scope.conf.pagesLength = scope.conf.pagesLength -1;
            }

            // pageList数组
            function getPagination(){
                // 当前页
                scope.conf.currentPage = parseInt(scope.conf.currentPage) ? parseInt(scope.conf.currentPage) : 1;
                // 总条数
                scope.conf.totalItems = parseInt(scope.conf.totalItems) ? parseInt(scope.conf.totalItems) : 0;

                // 每页显示的条数
                scope.conf.itemsPerPage = parseInt(scope.conf.itemsPerPage) ? parseInt(scope.conf.itemsPerPage) : 20;

                // 总页数
                scope.conf.numberOfPages = Math.ceil(scope.conf.totalItems/scope.conf.itemsPerPage);

                // 跳转页数
                if(scope.conf.currentPage < 1){
                    scope.conf.currentPage = 1;
                }

                if(scope.conf.currentPage > scope.conf.numberOfPages){
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }

                // 跳转页数
                scope.jumpPageNum = scope.conf.currentPage;

                //页数数组
                scope.pageList = [];
                if(scope.conf.numberOfPages <= scope.conf.pagesLength){
                	for(var i =1; i <= scope.conf.numberOfPages; i++){
                    	scope.pageList.push(i);
                	}
                }else{
                	//先计算中间偏移量
                	var offset = (scope.conf.pagesLength - 1) / 2;
                	if(scope.conf.currentPage <= offset){
                        for(var i =1; i <= scope.conf.pagesLength; i++){
                            scope.pageList.push(i);
                        }
                    }else if(scope.conf.currentPage >= scope.conf.numberOfPages - offset - 1){
                        for(var i = scope.conf.pagesLength - (scope.conf.numberOfPages - scope.conf.currentPage + 1); i >= 1; i--){
                            scope.pageList.push(scope.conf.currentPage - i);
                        }
                        for(var i = scope.conf.currentPage;i <= scope.conf.numberOfPages;i++){
                        	scope.pageList.push(i);
                        }
                    }else{
                        for(var i = Math.ceil(offset/2) ; i >= 1; i--){
                            scope.pageList.push(scope.conf.currentPage - i);
                        }
                        scope.pageList.push(scope.conf.currentPage);
                        for(var i = 1; i <= scope.conf.pagesLength - Math.ceil(offset/2) - 1; i++){
                            scope.pageList.push(scope.conf.currentPage + i);
                        }
                    }
                }
                scope.$parent.conf = scope.conf;
            }

            // prevPage
            scope.prevPage = function(){
                if(scope.conf.currentPage > 1){
                    scope.conf.currentPage -= 1;
                }
                scope.conf.onChange(scope.conf.currentPage);
            };
            // nextPage
            scope.nextPage = function(){
                if(scope.conf.currentPage < scope.conf.numberOfPages){
                    scope.conf.currentPage += 1;
                }
                scope.conf.onChange(scope.conf.currentPage);
            };

            // 跳转页
            scope.jumpToPage = function(){
                scope.jumpPageNum = scope.jumpPageNum.toString().replace(/[^0-9]/g,'');
                if(scope.jumpPageNum !== ''){
                    scope.conf.currentPage = scope.jumpPageNum;
                }

                scope.conf.onChange(scope.conf.currentPage > scope.conf.numberOfPages?scope.conf.numberOfPages:scope.conf.currentPage);
            };

            scope.$watch(function(){
                var newValue = scope.conf.currentPage + ' ' + scope.conf.totalItems + ' ';
                newValue += scope.conf.itemsPerPage;
                return newValue;
            }, getPagination);
		}
	};
}]);